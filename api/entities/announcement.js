import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
  } from 'typeorm';


  @Entity()
  export default class Announcement {

    @PrimaryGeneratedColumn()
    id
<<<<<<< HEAD
  
    @Column({ type: 'varchar' })
    img_link

    @Column({ type: 'varchar' })
=======

    @Column({ type: 'varchar' })
    img_link

    @Column({ type: 'varchar' })
>>>>>>> upstream/master
    link_to

  }
