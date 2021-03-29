# Module Based FrontEnd Orginazor

Every module is a project. Which can use other modules and can be used from other modules. 
Modules can have isolated or shared dependencies.

) 

## Features

- Dependecy Injection with decorators
- Layers for organization. (HttpClient, DataProvider, Controller, Mapper, Cache ...)
- Utility classes.
- Most dependencies uses Interfaces including utility classes. So you can write your own implementation or use default implementations.


## Motivation

Main motivation is to orginaze complicated enterprise level frontend projects that has many different modules that differs from each other in a way that business logic or application logic.

Organizes the part between backend and presentation of frontEnd. So there is no rendering part here. 

Lives in between from getting and sending data to backend  **<=>** rendering html, listening events.

To be more spesific. Communicates with backend and frontEnd framework. (Vue, React or your own render code)


### Table of contents
- [Module Based FrontEnd Orginazor](#module-based-frontend-orginazor)
  - [Features](#features)
  - [Motivation](#motivation)
    - [Table of contents](#table-of-contents)
    - [Install](#install)
  - [Layers](#layers)
    - [Module](#module)
    - [Global Module](#global-module)
    - [HTTPClient](#httpclient)
    - [Provider](#provider)
    - [Controller](#controller)
    - [Mapper](#mapper)
    - [Cache](#cache)
    - [Utilities](#utilities)



### [Install](#install)

npm:

`npm i @sabasayer/module.core --save`

yarn:

`yarn @sabasayer/module.core`

 
## [Layers](#layers)

### [Module](#module)

Keeps track of dependinces and provides them. Create a class that extends **CoreModule** . 

```Typescript
class MyModule extends CoreModule {
	bootstrap(options?:ModuleBootstrapOptions){
    //module spesific configurations
		super.bootstrap(options);
	}
}

const myModule = new MyModule();

//(optional)register decorators for dependency Injection
myModule.useDecorators(xInjectable,xResolve);

export {myModule};

```

Create DI Decorators if you want to use. 

```Typescript
export const xhResolve = new ResolveDecorators();
export const xInjectable = new InjectableDecorators();
```

Use Decorators

```Typescript
export class SomeNormalClass {
	@xResolve.controller(XController)
	controller:IXController;

	@yResolve.resolve(YController)
	yController:IYController;
}
```

Use module. HttpClient is required by default.

```Typescript
myModule.bootstrap({httpClient,config:myConfig});
otherModule.bootstrap({httpClient,config:otherConfig})
```

Use resolve decorator or module resolve functions

```Typescript
const someFunction = () => {
	const xController = xModule.resolveController(XController);
	const yController = yModule.resolve(XController)
}
```

Mocking dependincies for testing. 

```Typescript
describe("some test",()=>{
	beforeEach(()=> {
		myModule.clear()	
	})

	it("should work",() => {
		class TestXController implements IXController{
			someFunc(){.}
		}

		myModule.registerController(TestXController,{key:'XController'});

		....
		
	})
})
```


### [Global Module](#globalModule)

globalModule is the top level parent container. It contains some utility classes like :
- Localization
- CloneUtil
- EncryptionUtil
- PerformanceUtil
- DateUtil

These classes instances must be registered to globalModule before everything. There are default implementations, also you can write your own implementation and register their instances.

```Typescript
globalModule.setLocalization(defaultLocalization)
globalModule.setCloneUtil(customCloneUtil);
...
```


### [HTTPClient](#httpClient)

Communicates with backend. There is a **FetchHttpClient** that uses Fetch api. You can write your own implementation.

HttpClient does not depend anything but some other layers depend on it . So create it first after globalModule and module.

```Typescript
export const fetchClient = new FetchHTTPClient({
  hostName: "api.comed.com.tr",
  languagePrefix: "tr-tr",
  prefix: "api/json",
  headers: {
    "x-application-key": "/uq+fiM1AzYe7bHAJCixzg==",
    "content-type": "application/json",
  },
  createErrorFn,
});

----

myModule.bootstrap(httpClient:fetchClient);
otherModule.bootstrap(httpClient:fetchClient);

```


### [Provider](#provider)

Communicates with HTTPClient. I suggest that create one provider for each entity. implements **IProvider** but extending from **CoreProvider** is highly suggested. 

```Typescript
@injectable.provider()
export class AuthProvider extends BaseProvider {
  protected baseUrl = "core/auth";

  signIn(request: SignInRequest) {
    return this.post(signInRequestConfig, request);
  }

  signOut(request: SignOutRequest) {
    return this.post(signOutRequestConfig, request);
  }
}

-----

export const signInRequestConfig: IRequestConfig<
  SignInRequest,
  SignInResponseModel
> = {
  url: "signIn",
};

export const signOutRequestConfig: IRequestConfig<SignOutRequest, string> = {
  url: "signOut",
};

```


### [Controller](#controller)

Presentation layer must communicates with controllers only for data transfers. Caching, mapping etc. is handled by controller. Controller mostly uses other classes. 

```Typescript


@injectable.controller({ provider: AuthProvider })
export class AuthController implements IController {
  constructor(private provider: AuthProvider) {}

  async signIn(request: SignInRequest) {
    return this.provider.signIn(request);
  }
}

```


### [Mapper](#mapper)

Create map options between two interfaces. implements **IMapper<TSource,TTarget>** . There is a default implementation = **CoreMapper**

```Typescript
interface FirstType {
  first: string;
  second: number;
}

interface SecondType {
  first: string;
  age: number;
  sum: string;
}

const mapper = new CoreMapper<FirstType, SecondType>();

mapper
  .forTarget("first")
  .forTarget("age", "second")
  .forTarget("sum", (from) => `${from.first} ${from.second}`);

const mapped = mapper.mapToTarget({ first: "orange", second: 231 });
```


### [Cache](#cache)

Implements **ICache** interface. There are two implementations. **MemoryCache** **SessionStorageCache**


### [Utilities](#utilities)

Utility classes for making your life easier. Some other classes uses these utility classes if theye are registered to globalModule


| Utility          | Default             | Explanation                                                              |
| ---------------- | ------------------- | ------------------------------------------------------------------------ |
| ICLoneUtil       | defaultCloneUtil    | clone, cloneDeep values. Used by clone decorator                         |
| ILocalization    | defaultLocalization | translate strings. Used by CustomErrors.                                 |
| IDateUtil        | defaultDateUtil     | date functions                                                           |
| IEncryptUtil     | defaultEncryptUtil  | Encrypt and decrypt data. Used by sessionStorageCache                    |
| IPerformanceUtil | performanceUtil     | Measure performance of code blocks. Used by measurePerformace decorator. |