import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../..';
import fs from 'fs';
import path from 'path';

const feature = loadFeature('./features/Cadastro/cadastro.feature');
const request = supertest(app);


defineFeature(feature, test => {
  test('Cadastro bem sucedido', ({ given, when, then }) => {
    let response;
    given('um usuário José Maria que não está cadastrado no sistema', () => {
      let usersData = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
      usersData = usersData.filter(user => user.email !== 'JS@EMAIL.com');
      fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(usersData, null, 2));
    });

    when(/^o usuario preenche os dados fullName : "(.*)", birthday : "(.*)", email : "(.*)", cellphone : "(.*)", password : "(.*)", confirmPassword : "(.*)" e confirma$/, async (Nome, Nascimento, Email, Numero, Senha, ConfirmacaoSenha) => {
      const url = '/auth/signup';

      response = await request.post(url).send({
          fullName: Nome,
          birthday: Nascimento,
          email: Email,
          cellphone: Numero,
          password: Senha,
          confirmPassword: ConfirmacaoSenha
      });
    });

    then('o sistema confirma a requisição', () => {
      expect(response.status).toBe(201);
    });

    then('o usuário “José Maria” é registrado no sistema', () => {
      const { email, fullName } = response.body;

      expect(fullName).toBe("José Maria");
      expect(email).toBe("JS@EMAIL.com");
    });
  });

  test('Usuário já registrado', ({ given, when, then }) => {
    let response;
    given('um usuário “José Maria” que está cadastrado no sistema', () => {
      
    });

    when(/^o usuario preenche os dados fullName : "(.*)", birthday : "(.*)", email : "(.*)", cellphone : "(.*)", password : "(.*)", confirmPassword : "(.*)" e confirma$/, async (Nome, Nascimento, Email, Numero, Senha, ConfirmacaoSenha) => {
      const url = '/auth/signup';

      response = await request.post(url).send({
          fullName: Nome,
          birthday: Nascimento,
          email: Email,
          cellphone: Numero,
          password: Senha,
          confirmPassword: ConfirmacaoSenha
      });
    });

    then('o sistema manda uma mensagem de erro', () => {
      expect(response.status).toBe(400);
    });

    then(/^o usuário "(.*)" permanece cadastrado no sistema$/, (arg0) => {
      const { error } = response.body;

      expect(error).toBe("Email already used");
    });
  });

  test('Senhas não coincidem', ({ given, when, then }) => {
    let response;
    given('um usuário José Maria que não está cadastrado no sistema', () => {
      let usersData = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
      usersData = usersData.filter(user => user.email !== 'JS@EMAIL.com');
      fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(usersData, null, 2));
    });

    when(/^o usuario preenche os dados fullName : "(.*)", birthday : "(.*)", email : "(.*)", cellphone : "(.*)", password : "(.*)", confirmPassword : "(.*)" e confirma$/, async (Nome, Nascimento, Email, Numero, Senha, ConfirmacaoSenha) => {
      const url = '/auth/signup';

      response = await request.post(url).send({
          fullName: Nome,
          birthday: Nascimento,
          email: Email,
          cellphone: Numero,
          password: Senha,
          confirmPassword: ConfirmacaoSenha
      });
    });

    then('o sistema manda uma mensagem de erro', () => {
      expect(response.status).toBe(400);
    });

    then('o usuário José Maria não está registrado no sistema', () => {
      const { error } = response.body;

      expect(error).toBe("Passwords do not match");
    });
  });

test('Número de celular inválido', ({ given, when, then }) => {
  let response;
    given('um usuário João Pereira que não está cadastrado no sistema', () => {
      let usersData = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
      usersData = usersData.filter(user => user.email !== 'JS@EMAIL.com');
      fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(usersData, null, 2));
    });

    when(/^o usuario preenche os dados fullName: "(.*)", birthday: "(.*)", email: "(.*)", cellphone: "(.*)", password: "(.*)", confirmPassword: "(.*)" e confirma$/, async (Nome, Nascimento, Email, Numero, Senha, ConfirmacaoSenha) => {
      const url = '/auth/signup';

      response = await request.post(url).send({
          fullName: Nome,
          birthday: Nascimento,
          email: Email,
          cellphone: Numero,
          password: Senha,
          confirmPassword: ConfirmacaoSenha
      });
    });

    then('o sistema manda uma mensagem de erro de celular inválido', () => {
      expect(response.status).toBe(400);
    });

    then('o usuário João Pereira não está registrado no sistema', () => {
      const { error } = response.body;

      expect(error).toBe("Cellphone must have eleven digits");
    });
});

test('Email inválido', ({ given, when, then }) => {
  let response;
    given('um usuário João Pereira que não está cadastrado no sistema', () => {
      let usersData = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
      usersData = usersData.filter(user => user.email !== 'JS@EMAIL.com');
      fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(usersData, null, 2));
    });

    when(/^o usuario preenche os dados fullName: "(.*)", birthday: "(.*)", email: "(.*)", cellphone: "(.*)", password: "(.*)", confirmPassword: "(.*)" e confirma$/, async (Nome, Nascimento, Email, Numero, Senha, ConfirmacaoSenha) => {
      const url = '/auth/signup';

      response = await request.post(url).send({
          fullName: Nome,
          birthday: Nascimento,
          email: Email,
          cellphone: Numero,
          password: Senha,
          confirmPassword: ConfirmacaoSenha
      });
    });

    then('o sistema manda uma mensagem de erro de celular inválido', () => {
      expect(response.status).toBe(400);
    });

    then('o usuário João Pereira não está registrado no sistema', () => {
      const { error } = response.body;

      expect(error).toBe("Email must contain an '@' character");
    }); 
});

test('Data inválida', ({ given, when, then }) => {
  let response;
    given('um usuário João Pereira que não está cadastrado no sistema', () => {
      let usersData = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
      usersData = usersData.filter(user => user.email !== 'JS@EMAIL.com');
      fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(usersData, null, 2));
    });

    when(/^o usuario preenche os dados fullName: "(.*)", birthday: "(.*)", email: "(.*)", cellphone: "(.*)", password: "(.*)", confirmPassword: "(.*)" e confirma$/, async (Nome, Nascimento, Email, Numero, Senha, ConfirmacaoSenha) => {
      const url = '/auth/signup';

      response = await request.post(url).send({
          fullName: Nome,
          birthday: Nascimento,
          email: Email,
          cellphone: Numero,
          password: Senha,
          confirmPassword: ConfirmacaoSenha
      });
    });

    then('o sistema manda uma mensagem de erro de celular inválido', () => {
      expect(response.status).toBe(400);
    });

    then('o usuário João Pereira não está registrado no sistema', () => {
      const { error } = response.body;

      expect(error).toBe("Birthday must be in the format mm/dd/yyyy");
    });
});
});
