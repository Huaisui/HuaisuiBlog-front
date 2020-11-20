## 项目概述

前端：html+css+JavaScript+JQuery （使用ajax与后端交互

后端：springboot+mybatis

前后端分离开发，但是没有前后端分离部署

## 一.开发过程遇到的问题

### 1.CROS跨源资源共享

进行前后端分离会遇到的问题。

该机制使用附加的 [HTTP](https://developer.mozilla.org/zh-CN/docs/Glossary/HTTP) 头来告诉浏览器，准许运行在一个源上的Web应用访问位于另一不同源选定的资源。 当一个Web应用发起一个与自身所在源（域，协议和端口）不同的HTTP请求时，它发起的即跨源HTTP请求。
详情：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS

解决方式：http头部添加字段

```html
Access-Control-Allow-Origin: *
```

### 2.SpringBoot中找不到resources下的配置文件

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

### 3.mysql连接的url

jdbc:mysql://localhost:3306/数据库名称?serverTimezone=GMT%2B8&useUnicode=true&characterEncoding=UTF-8&useSSL=false&allowPublicKeyRetrieval=true

## 二.将Springboot项目部署到云服务器

### 1.购买服务器

### 2.购买域名

### 3.下载jdk并配置环境变量

我下载的版本：jdk-8u271-linux-x64.tar.gz

我放置在路径：/usr/local/java/

解压：tar -xvf jdk-8u271-linux-x64.tar.gz

配置环境变量：

step1：vim /etc/profile

step2：在最后加上如下配置：

​	export JAVA_HOME=/usr/local/java/jdk1.8.0_271

​	export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar

​	export PATH=$PATH:JAVA_HOME/bin

​	export JRE_HOME=$JAVA_HOME/jre

step3：source /etc/profile 使配置生效

java -version查看java版本

### 4.下载&配置tomcat

#### 下载

我下载的版本：apache-tomcat-9.0.39.tar

我放置在路径：/usr/local/tomcat/

解压：tar -xvf apache-tomcat-9.0.39.tar

tomcat不用配置环境变量直接能用

./startup.sh启动tomcat

./shutdown.sh关闭tomcat

这时候在浏览器输入：你的域名:8080可以访问到tomcat服务器

#### 配置

打开 /usr/local/tomcat/apache-tomcat-9.0.39/conf/server.xml

```xml
<!--这里的name原来是localhost，改成你的ip或域名-->
<Host name="www.teohuaisui.top"  appBase="webapps"
       unpackWARs="true" autoDeploy="true">
```

```xml
<!--这里原来的port是8080，将其改为80端口，即http端口，就可以在浏览器通过ip或者绑定好的域名直接访问tomcat-->
<Connector port="80" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443" />
```
```xml
<!--加上这一行，docBase填你项目war包的目录(打包目录见下面)，这样就可以通过域名直接访问这个项目(否则需要手动在url输入：域名/项目名)-->
<Context path="" docBase ="/usr/local/tomcat/apache-tomcat-9.0.39/webapps/HuaisuiBlog" reloadable="false"></Context>
```

```xml
<!--如果tomcat打开后，返回的html中文变成乱码，找到这一配置，并加入charset=UTF-8-->
<mime-mapping>
    <extension>html</extension>
    <mime-type>text/html;charset=UTF-8</mime-type>
</mime-mapping>
```
### 5.下载&安装&配置mysql

#### 下载&安装

step1：下载并安装MySQL官方的 Yum Repository

wget -i -c http://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm

step2：yum安装

yum -y install mysql80-community-release-el7-3.noarch.rpm

step3：安装mysql服务器

yum -y install mysql-community-server

centos7预装mariadb，按以上步骤安装完成后就会覆盖掉之前的mariadb

#### 配置

启动mysql：systemctl start mysqld.service

查看mysql运行状态：systemctl status mysqld.service

查看mysql预带的密码：grep "password" /var/log/mysqld.log

修改密码：ALTER USER 'root'@'localhost' IDENTIFIED BY 'new password';

grant all privileges on *.* to 'root'@'%' identified by 'password' with grant option;    //%表示所有ip都可登录

在腾讯云的防火墙打开mysql的3306端口，这样就可以远程登录服务器的mysql并进行操作

mysql -uroot -p  登录mysql，或者也可以用自己的电脑使用navicat、workbench登录

### 6.SpringBoot打包成war包

```xml
<!--pom文件加入如下配置-->
<!--排除springboot内置tomcat-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<!--加入servlet依赖-->
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>3.1.0</version>
    <scope>provided</scope>
</dependency>
<!--在build中加入finalName标签，自定义war包名称-->
<build>
    <finalName>HuaisuiBlog</finalName>
</build>
```

```java
//新增一个类，和启动类放在同一目录
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

public class ServletInitializer extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(DemoApplication.class);
    }
}
```

使用maven，clean，package，生成的war包在target下。将war包放到tomcat所在目录的webapps下。

### 7.启动项目

启动mysql，启动tomcat，结束~~