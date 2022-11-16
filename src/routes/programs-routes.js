import express, { json } from 'express';
import { connection } from '../libs/database.js';
import { Program } from "../class/Program.js";

const router = express.Router();

class programsRoutes {

    constructor() {
        connection
        //router.get('/:code', this.getOne); //
        router.get('/', this.getAll); //
    }

    getOne(req, res, next) {

    }
    async getAll(req, res, next) {
        let programs = [];
        try {

            connection.query(`SELECT PG.Id as PGId, PG.Title as PGTitle, PG.Description as PGDescription, PG.Propos as PGPropos, 
            SS.Id as SSId,SS.Title as SSTitle, SS.OrderOf as SSOrderOf, CS.Title as CSTitle, CS.Content as CSContent
            FROM Programs PG
            INNER JOIN Sessions SS ON PG.Id = SS.IdPrograms
            INNER JOIN SessionsCourses SC ON SS.Id = SC.IdSessions
            INNER JOIN Courses CS ON SC.IdCourses = CS.Id;`,
                function (error, results, fields) {
                    if (error) res.status(404).end();
                    let p = new Program(results[0]);

                    results.slice(1).forEach(r => {
                        if (p.TryInitialise(r)) {
                            programs.push(p);
                            p = new Program(r)
                        }
                    });
                    programs.push(p);
                    res.json(programs).status(200);
                })
        } catch (error) {
            next(error);
        }
    }

}

new programsRoutes();
export default router;
