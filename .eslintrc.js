module.exports = {
  // 此项是用来告诉eslint找当前配置文件不能往父级查找
  root: true,
  // 全局环境
  env: {
    node: true,
  },
  // 指定如何解析语法。可以为空，但若不为空，只能配该值
  parser: 'vue-eslint-parser',
  // 优先级低于parse的语法解析配置
  parserOptions: {
    // 指定ESlint的解析器
    parser: '@typescript-eslint/parser',
    // 允许使用ES语法
    ecmaVersion: 2020,
    // 允许使用import
    sourceType: 'module',
    // 允许解析JSX
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['plugin:vue/vue3-essential', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    'vue/no-multiple-template-root': 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'array-bracket-spacing': ['error', 'never'], // 是否允许非空数组里面有多余的空格
    'arrow-parens': 'warn', // 箭头函数用小括号括起来
    'block-spacing': ['error', 'always'], // =>的前/后括号
    'block-scoped-var': 'error', // 块语句中使用var
    'callback-return': 'warn', // 避免多次调用回调什么的
    camelcase: 'error', // 强制驼峰法命名
    'comma-dangle': ['off', 'never'], // 对象字面量项尾不能有逗号
    'comma-spacing': 'warn', // 逗号前后的空格
    'comma-style': ['error', 'last'], // 逗号风格，换行时在行首还是行尾
    complexity: ['warn', 30], // 循环复杂度
    'consistent-return': 'warn', // return 后面是否允许省略
    'constructor-super': 'warn', // 非派生类不能调用super，派生类必须调用super
    curly: ['error', 'all'], // 必须使用 if(){} 中的{}
    'default-case': 'error', // switch语句最后必须有default
    'dot-location': 'off', // 对象访问符的位置，换行的时候在行首还是行尾
    'eol-last': 'error', // 文件以单一的换行符结束
    eqeqeq: 'error', // 要求使用 === 和 !==
    'func-names': 'warn', // 函数表达式必须有名字
    'generator-star-spacing': 'warn', // 生成器函数*的前后空格
    'guard-for-in': 'warn', // for in循环要用if语句过滤
    'id-length': 'off', // 变量名长度
    'init-declarations': 'warn', // 声明时必须赋初始值
    'lines-around-comment': 'off', // 行前/行后备注
    'new-cap': 'error', // 函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
    'new-parens': 'error', // new时必须加小括号
    'newline-after-var': 'off', // 声明后必须换行
    'no-alert': 'error', // 禁止使用alert confirm prompt
    'no-array-constructor': 'error', // 禁止使用数组构造器
    'no-bitwise': 'off', // 禁止使用按位运算符
    'no-caller': 'error', // 禁止使用arguments.caller或arguments.callee
    'no-catch-shadow': 'error', // 禁止catch子句参数与外部作用域变量同名
    'no-class-assign': 'error', // 禁止给类赋值
    'no-cond-assign': 'error', // 禁止在条件表达式中使用赋值语句
    'no-console': 'warn', // 是否使用 console
    'no-const-assign': 'error', // 禁止修改const声明的变量
    'no-constant-condition': 'error', // 禁止在条件中使用常量表达式 if(true) if('warn')
    'no-continue': 'error', // 禁止使用continue
    'no-control-regex': 'error', // 禁止在正则表达式中使用控制字符
    'no-debugger': 'error', // 是否使用 debugger
    'no-delete-var': 'error', // 不能对var声明的变量使用delete操作符
    'no-div-regex': 'warn', // 不能使用看起来像除法的正则表达式/=foo/
    'no-dupe-keys': 'error', // 在创建对象字面量时不允许键重复 {a:'warn',a:'warn'}
    'no-dupe-args': 'error', // 函数参数不能重复
    'no-duplicate-case': 'error', // switch中的case标签不能重复
    'no-else-return': 'error', // 如果if语句里面有return,后面不能跟else语句
    'no-empty': 'warn', // 块语句中的内容不能为空
    'no-empty-character-class': 'error', // 正则表达式中的[]内容不能为空
    'no-eq-null': 'error', // 禁止对null使用==或!=运算符
    'no-eval': 'warn', // 禁止使用eval
    'no-ex-assign': 'error', // 禁止给catch语句中的异常参数赋值
    'no-extend-native': 'error', // 禁止扩展native对象
    'no-extra-bind': 'error', // 禁止不必要的函数绑定
    'no-extra-boolean-cast': 'error', // 禁止不必要的bool转换
    'no-extra-parens': 'off', // 禁止非必要的括号
    'no-extra-semi': 'error', // 禁止多余的冒号
    'no-fallthrough': 'warn', // 禁止switch穿透
    'no-floating-decimal': 'error', // 禁止省略浮点数中的'off' .5 3.
    'no-func-assign': 'error', // 禁止重复的函数声明
    'no-implicit-coercion': 'error', // 禁止隐式转换
    'no-implied-eval': 'error', // 禁止使用隐式eval
    'no-inline-comments': 'off', // 禁止行内备注
    'no-invalid-regexp': 'error', // 禁止无效的正则表达式
    'no-invalid-this': 'error', // 禁止无效的this，只能用在构造器，类，对象字面量
    'no-irregular-whitespace': 'error', // 不能有不规则的空格
    'no-iterator': 'error', // 禁止使用__iterator__ 属性
    'no-label-var': 'error', // label名不能与var声明的变量名相同
    'no-labels': 'error', // 禁止标签声明
    'no-lone-blocks': 'error', // 禁止不必要的嵌套块
    'no-lonely-if': 'error', // 禁止else语句内只有if语句
    'no-loop-func': 'error', // 禁止在循环中使用函数（如果没有引用外部变量不形成闭包就可以）
    'no-multi-spaces': 'warn', // 不能用多余的空格
    'no-multi-str': 'error', // 字符串不能用\换行
    'no-native-reassign': 'error', // 不能重写native对象
    'no-negated-in-lhs': 'error', // in 操作符的左边不能有!
    'no-nested-ternary': 'error', // 禁止使用嵌套的三目运算
    'no-new': 'error', // 禁止在使用new构造一个实例后不赋值
    'no-new-func': 'error', // 禁止使用new Function
    'no-new-object': 'error', // 禁止使用new Object()
    'no-new-require': 'error', // 禁止使用new require
    'no-new-wrappers': 'error', // 禁止使用new创建包装实例，new String new Boolean new Number
    'no-obj-calls': 'error', // 不能调用内置的全局对象，比如Math() JSON()
    'no-octal': 'error', // 禁止使用八进制数字
    'no-octal-escape': 'error', // 禁止使用八进制转义序列
    'no-param-reassign': 'error', // 禁止给参数重新赋值
    'no-path-concat': 'error', // node中不能使用__dirname或__filename做路径拼接
    'no-plusplus': 'off', // 禁止使用++，--
    'no-process-env': 'off', // 禁止使用process.env
    'no-process-exit': 'off', // 禁止使用process.exit()
    'no-proto': 'error', // 禁止使用__proto__属性
    'no-redeclare': 'error', // 禁止重复声明变量
    'no-regex-spaces': 'error', // 禁止在正则表达式字面量中使用多个空格 /foo bar/
    'no-return-assign': 'error', // return 语句中不能有赋值表达式
    'no-script-url': 'error', // 禁止使用javascript:void('off')
    'no-self-compare': 'error', // 不能比较自身
    'no-sequences': 'error', // 禁止使用逗号运算符
    'no-shadow': 'off', // 外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
    'no-shadow-restricted-names': 'error', // 严格模式中规定的限制标识符不能作为声明时的变量名使用
    'no-sparse-arrays': 'error', // 禁止稀疏数组， ['warn',,'error']
    'no-ternary': 'off', // 禁止使用三目运算符
    'no-trailing-spaces': 'error', // 一行结束后面不要有空格
    'no-this-before-super': 'error', // 在调用super()之前不能使用this或super
    'no-throw-literal': 'error', // 禁止抛出字面量错误 throw 'error';
    'no-undef': 'warn', // 不能有未定义的变量
    'no-undef-init': 'error', // 变量初始化时不能直接给它赋值为undefined
    'no-undefined': 'off', // 不能使用undefined
    'no-unexpected-multiline': 'error', // 避免多行表达式
    'no-underscore-dangle': 'warn', // 标识符不能以_开头或结尾
    'no-unneeded-ternary': 'error', // 禁止不必要的嵌套 var isYes = answer === 'warn' ? true : false;
    'no-unreachable': 'error', // 不能有无法执行的代码
    'no-unused-expressions': 'warn', // 禁止无用的表达式
    'no-use-before-define': 'off', // 未定义前不能使用
    'no-useless-call': 'error', // 禁止不必要的call和apply
    'no-void': 'error', // 禁用void操作符
    'no-var': 'error', // 禁用var，用let和const代替
    'no-with': 'error', // 禁用with
    'object-curly-spacing': ['error', 'always'], // 大括号内是否允许不必要的空格
    'object-shorthand': 'error', // 强制对象字面量缩写语法
    'prefer-const': 'error', // 首选const
    'prefer-spread': 'error', // 首选展开运算
    'prefer-reflect': 'error', // 首选Reflect的方法
    quotes: ['error', 'single'], // 引号类型 `` '' ''
    radix: 'error', // parseInt必须指定第二个参数
    'id-match': 'error', // 命名检测
    'require-yield': 'error', // 生成器函数必须有yield
    semi: ['error', 'always'], // 语句强制分号结尾
    'sort-vars': 'error', // 变量声明时排序
    'space-before-blocks': ['error', 'always'], // 不以新行开始的块{前面要不要有空格
    'space-infix-ops': 'error', // 中缀操作符周围要不要有空格
    'space-unary-ops': ['error', { words: true, nonwords: false }], // 一元运算符的前/后要不要加空格
    'spaced-comment': 'warn', // 注释风格要不要有空格什么的
    strict: 'error', // 使用严格模式
    'use-isnan': 'error', // 禁止比较时使用NaN，只能用isNaN()
    'valid-jsdoc': 'off', // jsdoc规则
    'valid-typeof': 'error', // 必须使用合法的typeof的值
    'vars-on-top': 'error', // var必须放在作用域顶部
    'vue/require-v-for-key': 'error', // vue的for循环是否必须有key
    'wrap-iife': ['error', 'inside'], // 立即执行函数表达式的小括号风格
    'wrap-regex': 'off', // 正则表达式字面量用小括号包起来
    yoda: ['error', 'never'], // 禁止尤达条件
  },
};
