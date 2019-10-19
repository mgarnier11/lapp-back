import assert from 'assert';
import expect from 'expect';
import app from '../../src/app';
import { Question } from '../../src/classes/question.class';
import { QuestionServiceClass } from '../../src/services/questions/questions.class';

describe("'questions' service", async () => {
  let service: QuestionServiceClass;
  let question: Question;

  before(() => {
    return new Promise((res, rej) => {
      service = app.services.questions;

      res();
    });
  });

  it('initialized the service', () => {
    assert.ok(service, 'Initialized the service');
  });

  it('created a question', async () => {
    question = Question.New({
      text: 'test'
    });
    question = await service.create(question);

    assert.equal(question.text, 'test', "Created a new 'test' question");
  });

  it('get a question', async () => {
    let getQuestion = await service.get(question.id);

    assert.equal(
      getQuestion.text,
      question.text,
      "Got the created 'test' question"
    );
  });

  it('find a question', async () => {
    let findQuestions = await service.find({ query: { _id: question.id } });

    assert.equal(
      findQuestions[0].text,
      question.text,
      "Found the created 'test' question"
    );
  });

  it('update a question', async () => {
    question.text = 'updated';
    let modifiedQuestion = await service.update(question.id, question);
    assert.equal(
      modifiedQuestion.text,
      question.text,
      "Modified the 'test' question to 'updated'"
    );
  });

  it('patch a question', async () => {
    question.text = 'patched';
    let patchedQuestion = await service.patch(question.id, question);

    assert.equal(
      patchedQuestion.text,
      question.text,
      "Modified the 'updated' question to 'patched'"
    );
  });

  it('remove a question', async () => {
    let removedQuestion = await service.remove(question.id);

    assert.equal(
      removedQuestion.id.toString(),
      question.id.toString(),
      "Removed the 'patched' question"
    );
  });
});
