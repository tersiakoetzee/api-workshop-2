
module.exports = function (pool) {
    async function addFavorites(car) {
        let data = [
            car.reg_number,
            car.color,
            car.make,
            car.model,
            car.price 
        ];

        let sql = `INSERT INTO favorites(reg_number, color, make, model, price) VALUES($1, $2, $3, $4, $5)`;
        let results = await pool.query(sql, data)
        return results;
    }

    async function getFavorites() {
       let sql = 'select * from favorites';
       let results = await pool.query(sql)
        return results.rows
    }

    return {
        addFavorites,
        getFavorites
    }
  
  }