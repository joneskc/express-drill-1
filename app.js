const express = require('express')
const app = express()
const cohorts = require('./data/cohorts')
const cors = require('cors')

app.use(cors())

const port = process.env.PORT || 3000

app.get('/', (req, res) => res.send({data: cohorts}))

function findById(id) {
    for(i = 0; i < cohorts.length; i++) {
        if (cohorts[i].id === +id) {
            return cohorts[i]
        }
    }
    return null
}

app.get('/:id', (req, res, next) => {
    const cohort = findById(req.params.id)

    if(!cohort) {
        res.status(404).json({
            error: {
                message: "No record found!"
            }
        })
    } else {
        res.json({
            data: cohort
        })
    }
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})