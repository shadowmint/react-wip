export class QuestionService {
  constructor() {
    if (new.target === QuestionService) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
  }

  /**
   * Fetch a question by id.
   * @param id The id of the question.
   * @return Promise A promise for the question state.
   */
  getQuestion(id) {
    let _ = id;
    return Promise.reject(new Error("Not implemented"));
  }

  /**
   * Save a question.
   * @param id The id of the question.
   * @param model The view model of the question.
   * @return Promise A promise for the operation.
   */
  saveQuestion(id, model) {
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