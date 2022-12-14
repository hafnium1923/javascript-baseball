const MU = require("@woowacourse/mission-utils");

class App {
  play() {
    MU.Console.print('숫자 야구 게임을 시작합니다.');
      const RANDOM = this.makeRandomNum();
      console.log(RANDOM);
      this.gamePlay(RANDOM);
  }

  replay() {
    MU.Console.readLine('게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.', (newGame) => {
      if(!(newGame == 1 || newGame ==2)) throw '정해진 커맨드만 입력하세요';
      if(newGame == 1) {
        const RANDOM = this.makeRandomNum();
        console.log(RANDOM);
        this.gamePlay(RANDOM);
      }
      else
        return MU.Console.close();
    });
  }

  gamePlay(RANDOM) {
    MU.Console.readLine('숫자를 입력해주세요 : ', (userNum) => {
      this.userAnswer(userNum);
      let user =  this.makeUserArray(userNum);
      const BASEBALL = this.discriminateAnswer(RANDOM, user);
      this.printResult(BASEBALL);
      if(BASEBALL[1] === 3) 
        this.replay();
      else this.gamePlay(RANDOM)
    });
  }
  makeUserArray(userNum) {
    let user = [];
    for(let i = 2; i >= 0; i--) {
      user[i] = userNum % 10;
      userNum = parseInt(userNum / 10);
    }
    console.log(user);
    return user;
  }
  printResult(BASEBALL) {
    if(BASEBALL[1] === 0) {
      if(BASEBALL[0] === 0)
        MU.Console.print('낫싱');
      else
        MU.Console.print(`${BASEBALL[0]}볼`);
    } 
    else if(BASEBALL[0] === 0) {
      if(BASEBALL[1] != 0)
        MU.Console.print(`${BASEBALL[1]}스트라이크`);
      if(BASEBALL[1] === 3) 
        MU.Console.print(`3개의 숫자를 모두 맞히셨습니다! 게임 종료`);
    }
    else
      MU.Console.print(`${BASEBALL[0]}볼 ${BASEBALL[1]}스트라이크`);
  }

  discriminateAnswer(RANDOM, userNum) {
    let ball = 0,strike = 0;
    for(let i = 0; i < RANDOM.length; i++) {
      if(RANDOM[i] === userNum[i]) strike++;
    }
    ball = userNum.filter(x => RANDOM.includes(x)).length - strike;
    if( ball < 0) ball = 0;
    return [ball, strike];
  }

  userAnswer(userNum) {
   if(userNum.length != 3) throw '3자리 숫자를 입력하세요';
   if(isNaN(Number(userNum))) throw '숫자만 입력하세요';
   let num = new Set();
   for(let i = 0; i < 3; i++) {
    num.add(userNum % 10);
    userNum = parseInt(userNum / 10);
   }
   if(num.size != 3) throw '중복된 숫자 없이 입력하세요'; 
  }
  
  
  makeRandomNum() {
    let randomNum = new Set();
    while(randomNum.size != 3) {
      randomNum.add(MU.Random.pickNumberInRange(1,9));
    }
    return Array.from(randomNum);
  }
}
const app = new App();
app.play();
module.exports = App;
