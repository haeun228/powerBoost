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
        userId: 'ewhain2',
        title: '비가 와요',
        content: '모두 우산 챙기세요!',
      },
      {
        postId: '71f887cd-d8ff-4dae-af51-60fa8c500988',
        userId: 'ewhain3',
        title: '다들 뭐하시나요?',
        content: '비가 오네요',
      },
      {
        postId: '9c7fc37e-10d7-4b9f-9f1a-b0e320ec91fa',
        userId: 'ewhain4',
        title: '밖에 비 많이 오나요?',
        content: '궁금합니다',
      },
      {
        postId: 'ac66225b-991c-46ba-b3e4-9db2ee57154d',
        userId: 'ewhain5',
        title: '제목제목제목',
        content: '내용내용내용',
      }
    ]);

    await queryInterface.bulkInsert('Likes', [
      {
        postId: 'ad58eaee-fd2a-4fa9-aa3c-a452163049ca',
        userId: 'ewhain2',
      },
      {
        postId: 'ad58eaee-fd2a-4fa9-aa3c-a452163049ca',
        userId: 'ewhain3',
      },
      {
        postId: 'ad58eaee-fd2a-4fa9-aa3c-a452163049ca',
        userId: 'ewhain4',
      },
      {
        postId: 'f359f32d-aa03-4988-97a2-d149e44c4478',
        userId: 'ewhain2',
      },
      {
        postId: 'f359f32d-aa03-4988-97a2-d149e44c4478',
        userId: 'ewhain5',
      },
    ]);

    await queryInterface.bulkInsert('Comments', [
      {
        id: '03d57145-4c79-44bd-9111-2a2de677a1df',
        postId: 'f359f32d-aa03-4988-97a2-d149e44c4478',
        userId: 'ewhain2',
        content: '좋은 정보 감사합니다!',
      },
      {
        id: '8b0e599a-8dbc-4480-9ce7-ac8c18e5130a',
        postId: 'ad58eaee-fd2a-4fa9-aa3c-a452163049ca',
        userId: 'ewhain2',
        content: '저도 반가워요~~',
      },
      {
        id: '5321974b-e949-4c91-b287-16d2165da0b9',
        postId: 'ad58eaee-fd2a-4fa9-aa3c-a452163049ca',
        userId: 'ewhain4',
        content: '안녕하세요 ㅎㅎ',
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Likes', null, {});
    await queryInterface.bulkDelete('Comments', null, {});
    await queryInterface.bulkDelete('Posts', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
