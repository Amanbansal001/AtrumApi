const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = function (req) {

    const offset = ((req.query.page - 1) * req.query.pageSize);
    const limit = req.query.page * req.query.pageSize;
    let where = {};
    let or = [];
    let order = "id asc";

    req.query.sortBy = (req.query.sortBy) ? req.query.sortBy : 'asc';
    req.query.sortBy = (req.body.sortBy) ? req.body.sortBy : req.query.sortBy;
    req.query.limit = (req.query.limit) ? req.query.limit : 0;

    if (req.query) {
        for (var key in req.query) {
            if (req.query[key]!="null" && req.query[key]) {
                
                if(key.indexOf('Like')!=-1){
                    let orgKey = key.replace('Like','');
                    or.push({
                        [orgKey]:{[Op.like]:`%${req.query[key]}%`}
                    })
                }else if(key.indexOf('From')!=-1){
                    let orgKey = key.replace('From','');
                    where = {
                        ...where, [orgKey]: {
                            [Op.between]: [req.query[key], req.query[`${orgKey}To`]]
                        }
                    };
                }else if(key.indexOf('notIn')!=-1){
                    let orgKey = key.replace('notIn','');
                    or.push({
                        [orgKey]:{[Op.notIn]: req.query[key].split(",")}
                    })
                }else if(key.indexOf('In')!=-1){
                    let orgKey = key.replace('In','');
                    or.push({
                        [orgKey]:{[Op.in]: req.query[key].split(",")}
                    })
                }else if (key != "sortBy" 
                && key != "from" 
                && key != "to" 
                && key != "page" 
                && key != "pageSize" 
                && key != "limit"
                && (key.indexOf('Date')==-1)
                && (key.indexOf('createdAt')==-1)
                ) {
                    where = {
                        ...where, [key]: `${req.query[key]}`
                    };
                } else if (key == "sortBy") {
                    order = [['updatedAt' ,`${req.query[key]}`]];
                }

            }
            
        }
    }


    if(or.length>0){
        where={...where,[Op.or]:or};
    }
    
    return ({
        where: where,
        offset: offset,
        limit: limit,
        order: order
    })

};