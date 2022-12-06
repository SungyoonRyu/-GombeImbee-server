import sql from "../db/index.js";

const add = async (req, res) => {
    query = "INSERT INTO bookmark(title, url, description, tag, link, group_id) VALUES(?, ?, ?, ?, ?, ?)";
    sql.query(query, [req.body.title, req.body.url, req.body.description, req.body.tag, req.body.link, req.body.group_id],
        (error, results) => {
            if (error) {
                console.error(error);
                res.sendStatus(400);
                return;
            }
            res.sendState(200);
        });
    return true;
}

// req.body = { bookmark id }
const del = async (req, res) => {
    query = "DELETE FROM bookmark WHERE id = ?;";
    sql.query(query, [req.body.id],
        (error, results) => {
            if (error) {
                console.error(error);
                res.sendStatus(400);
                return;
            }
            res.sendState(200);
        });
    return true;
}

const get = async (req, res) => {
    query ="SELEC * FROM bookmark WHERE id = ?;";
    sql.query(query, [req.query.id],
        (error, results) => {
            if (error) {
                console.error(error);
                res.sendStatus(400);
                return;
            }

            if (results.length === 0) 
                res.sendStatus(401);
            else {
                res.send(results);
            }
        });
    return true;
}

const bookmark = {
    add,
    del,
    get
};

export default bookmark;