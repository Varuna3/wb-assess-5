import { DataTypes, Model, Op } from 'sequelize'
import util from 'util'
import connectToDB from './db.js'

const db = await connectToDB('postgresql:///animals')

export class Human extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }

  getFullName() {
    return `${this.fname} ${this.lname}`
  }
}

Human.init(
  {
    humanId: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fname: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    lname: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
  },
  {
    modelName: 'human',
    sequelize: db,
  }
)

export class Animal extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}

Animal.init(
  {
    animalId: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    birthYear: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: 'animal',
    sequelize: db,
  }
)

Human.hasMany(Animal, { foreignKey: 'humanId' })
Animal.belongsTo(Human, { foreignKey: 'humanId' })

async function getHumansByAnimalSpecies(species) {
  let humans = new Set()
  let humanIds = await Animal.findAll({
    attributes: ['humanId'],
    where: { species: species },
  })
  for (const id of humanIds) {
    humans.add((await Human.findByPk(id.humanId)).getFullName())
  }
  return humans
}

await db.sync()

// --> REMOVE THIS BEFORE RUNNING ``BUN RUN TEST``

export default db
