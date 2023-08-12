import Process from 'App/Models/Process'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Process, ({ faker }) => {
  return {
    // make some array using some command from faker
    command: Array.from({ length: 3 }, () => faker.lorem.sentences(Math.floor(Math.random() * 10))),
  }
}).build()
