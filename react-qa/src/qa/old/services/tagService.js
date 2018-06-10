export class TagService {
  constructor() {
    if (new.target === TagService) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
  }

  /**
   * Fetch a question by id.
   * @param partial The id of the question.
   * @return Promise A promise for a set of tags.
   */
  suggestTags(partial) {
    let _ = partial;
    return Promise.reject(new Error("Not implemented"));
  }

  /**
   * Save a question.
   * @param id The id of the question.
   * @param model The view model of the question.
   * @return Promise A promise for the operation.
   */
  createTag(id, model) {
    let _ = [model, id];
    return Promise.reject(new Error("Not implemented"));
  }
}

export class MockQuestionService extends QuestionService {
  constructor() {
    super();
  }

  /**
   * Fetch a question by id.
   * @param id The id of the question.
   * @return Promise A promise for the question state.
   */
  getQuestion(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          title: `Question ${id}`,
          body: "**body**",
          tags: ["one", "twp"]
        });
      }, 500);
    });
  }

  /**
   * Save a question.
   * @param id The id of the question.
   * @param model The view model of the question.
   * @return Promise A promise for the operation.
   */
  saveQuestion(id, model) {
    let _ = [model, id];
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  }
}