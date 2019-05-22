class test {

   weekly = async () => { console.log('weekly'); }

   daily = () => { console.log('daily'); }

   hello = () => { console.log('hello'); }

};

function a(arg) {
   const t = new test();
   t[arg]();
}

const arg = process.argv[2];
a(arg);
