import assert from 'assert';
import expect from 'expect';
import app from '../../src/app';
import { QuestionType } from '../../src/classes/questionType.class';
import { QuestionTypeServiceClass } from '../../src/services/question-types/question-types.class';

describe("'questionTypes' service", async () => {
  let service: QuestionTypeServiceClass;
  let questionType: QuestionType;

  before(() => {
    return new Promise((res, rej) => {
      service = app.services['question-types'];

      res();
    });
  });

  it('initialized the service', () => {
    assert.ok(service, 'Initialized the service');
  });

  it('created a questionType', async () => {
    questionType = QuestionType.New({
      name: 'test'
    });
    questionType = await service.create(questionType);

    assert.equal(
      questionType.name,
      'test',
      "Created a new 'test' questionType"
    );
  });

  it('get a questionType', async () => {
    let getQuestionType = await service.get(questionType.id);

    assert.equal(
      getQuestionType.name,
      questionType.name,
      "Got the created 'test' questionType"
    );
  });

  it('find a questionType', async () => {
    let findQuestionTypes = await service.find({
      query: { _id: questionType.id }
    });

    assert.equal(
      findQuestionTypes[0].name,
      questionType.name,
      "Found the created 'test' questionType"
    );
  });

  it('update a questionType', async () => {
    questionType.name = 'updated';
    let modifiedQuestionType = await service.update(
      questionType.id,
      questionType
    );
    assert.equal(
      modifiedQuestionType.name,
      questionType.name,
      "Modified the 'test' questionType to 'updated'"
    );
  });

  it('patch a questionType', async () => {
    questionType.name = 'patched';
    let patchedQuestionType = await service.patch(
      questionType.id,
      questionType
    );

    assert.equal(
      patchedQuestionType.name,
      questionType.name,
      "Modified the 'updated' questionType to 'patched'"
    );
  });

  it('remove a questionType', async () => {
    let removedQuestionType = await service.remove(questionType.id);

    assert.equal(
      removedQuestionType.id.toString(),
      questionType.id.toString(),
      "Removed the 'patched' questionType"
    );
  });
});
