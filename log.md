# 开发过程遇到的问题

## CROS跨源资源共享

该机制使用附加的 [HTTP](https://developer.mozilla.org/zh-CN/docs/Glossary/HTTP) 头来告诉浏览器，准许运行在一个源上的Web应用访问位于另一不同源选定的资源。 当一个Web应用发起一个与自身所在源（域，协议和端口）不同的HTTP请求时，它发起的即跨源HTTP请求。
详情：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS

解决方式：http头部添加字段

```html
Access-Control-Allow-Origin: *
```

```java
//在springboot中：
HttpHeaders header = new HttpHeaders();
header.set("Access-Control-Allow-Origin","*");
ResponseEntity<XXX> entity = ResponseEntity.ok().headers(header).body(xxx);
```

## SpringBoot中找不到resources下的配置文件

解决方式：pom.xml中添加如下配置

```xml
<build>
    <resources>
        <resource>
            <directory>src/main/resources</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
            <filtering>true</filtering>
        </resource>
        <resource>
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
            <filtering>true</filtering>
        </resource>
    </resources>
</build>
```