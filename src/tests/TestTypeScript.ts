namespace tests{
    export class TestTypeScript{
        constructor(){
            this.testStatic()
        }
        testStatic(){
            var a1 = new MyClass1();
            console.log("[info]","a1:",a1.v2,MyClass1.v1,a1["prototype"]);
        }
    }
    class MyClass1{
        static v1 = 37
        v2 = 48
    }
}