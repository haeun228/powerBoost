'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        userId: 'ewhain',
        email: 'ewhain@gmail.com',
        password: '$2b$10$rHQFHlHn3vTkoSURkRMXeueen2UMmkkV8qHDD5V55XaxuSYeWGp.S',
      }, 
      {
        userId: 'ewhain2',
        email: 'ewhain2@gmail.com',
        password: '$2b$10$NpInaf6kfcWc3Q10eJ1A5u/0rYME.nv9AhJAHOwcVf0otP5Nj0L3O',
      },
      {
        userId: 'ewhain3',
        email: 'ewhain3@gmail.com',
        password: '$2b$10$d2J9XAtXw2VBUfn9XQHgC.7alNmuJeLgKdKrHwFePg8pYj458gDti',
      },
      {
        userId: 'ewhain4',
        email: 'ewhain4@gmail.com',
        password: '$2b$10$C8Bb.I1I5zBtNDCHHoYzxuUf03ZYEd3hEdt0ouyGb0FNYwMeivgnq',
      },
      {
        userId: 'ewhain5',
        email: 'ewhain5@gmail.com',
        password: '$2b$10$YyxHYJwNQWkBYpdKZPH2JeB792pCplXbCgfT9kZuwrF6efRXEwYgG',
      },
    ]);
    await queryInterface.bulkInsert('Posts', [
      {
        postId: 'ad58eaee-fd2a-4fa9-aa3c-a452163049ca',
        userId: 'ewhain',
        title: '안녕하세요',
        content: '모두 반가워요~',
      },
      {
        postId: 'f359f32d-aa03-4988-97a2-d149e44c4478',
        userId: 'ewhain3',
        title: '비가 와요',
        content: '모두 우산 챙기세요!',
      },
      {
        postId: '71f887cd-d8ff-4dae-af51-60fa8c500988',
        userId: 'ewhain4',
        title: '제목제목제목',
        content: '내용내용내용내용내용내용',
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
