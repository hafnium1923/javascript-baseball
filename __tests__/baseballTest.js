const App = require("../src/App");
const MissionUtils = require("@woowacourse/mission-utils");

const mockQuestions = (answers) => {
  MissionUtils.Console.readLine = jest.fn();
  answers.reduce((acc, input) => {
    return acc.mockImplementationOnce((question, callback) => {
      callback(input);
    });
  }, MissionUtils.Console.readLine);
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("예외 처리 테스트", () => {
  test("3자리 초과 숫자 입력", () => {
    const randoms = [1, 3, 5];
    const answers = ["2345"];
    
    mockRandoms(randoms);
    mockQuestions(answers);

    expect(() => {
        const app = new App();
        app.play();
      }).toThrow();
    
    });

  test("숫자아닌 문자 입력", () => {
    const randoms = [1, 3, 5];
    const answers = ["12!"];

    mockRandoms(randoms);
    mockQuestions(answers);

    expect(() => {
      const app = new App();
      app.play();
    }).toThrow();
  });

  test("중복된 숫자 입력", () => {
    const randoms = [1, 3, 5];
    const answers = ["113"];

    mockRandoms(randoms);
    mockQuestions(answers);

    expect(() => {
      const app = new App();
      app.play();
    }).toThrow();
  });
});
