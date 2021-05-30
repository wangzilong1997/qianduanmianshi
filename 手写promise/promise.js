function Promise(executor){

    this.PromiseState = 'pending'
    this.PromiseResult = null

    //声明回调函数
    this.callback = {}

    //预先保存实例对象的值
    const self = this

    //resolve函数
    function resolve(data){
        //判断状态 
        if (self.PromiseState !== 'pending') return
        //1修改对象的状态（promiseState）
        self.PromiseState = 'fulfilled'
        //2设置对象结果值（promiseResult）
        self.PromiseResult = data

        //调用成功的回调函数
        if(self.callback.onResolved){
            self.callback.onResolved(data)
        }
        
    }
    //reject函数
    function reject(data){
        //判断状态 
        if (self.PromiseState !== 'pending') return
        //1修改对象的状态（promiseState）
        self.PromiseState = 'reject'
        //2设置对象结果值（promiseResult）
        self.PromiseResult = data

        //调用失败时候的回调
        if(self.callback.onRejected){
            self.callback.onRejected(data)
        }
    }
    try{
        //同步调用【执行器函数】
        executor(resolve,reject)
    }catch(e){
        reject(e);
    }
    
}
Promise.prototype.then = function(onResolved,onRejected){
    //调用回调函数
    //并且传递参数
    if(this.PromiseState === 'fulfilled'){
        onResolved(this.PromiseResult)
    }

    if(this.PromiseState === 'reject'){
        onRejected(this.PromiseResult)
    }

    //判断pending状态
    if(this.PromiseState === 'pending'){
        //保存回调函数

        this.callback = {
            onResolved:onResolved,
            onRejected:onRejected
        }

    }

}