const express = require("express");
const soap = require("soap");
const http = require("http");

const app = express();

// قاعدة بيانات وهمية لتسجيل المستخدمين
const users = [];

// تعريف خدمات SOAP (المنطق)
const myService = {
  MyService: {
    MyPort: {
      sayHello: function (args) {
        return { greeting: `Hello, ${args.name}!` };
      },
      registerUser: function (args) {
        const userId = `USER-${Math.floor(Math.random() * 100000)}`;
        const user = {
          id: userId,
          name: args.name,
          email: args.email,
          age: parseInt(args.age, 10),
        };

        users.push(user);

        return {
          userId,
          message: "User registered successfully!",
        };
      },
    },
  },
};

// WSDL (وصف الخدمة)
const wsdl = `
<definitions name="MyService"
             targetNamespace="http://example.com/myservice"
             xmlns="http://schemas.xmlsoap.org/wsdl/"
             xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
             xmlns:tns="http://example.com/myservice"
             xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <types>
    <xsd:schema targetNamespace="http://example.com/myservice">
      <xsd:element name="sayHello">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="name" type="xsd:string" />
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>
      <xsd:element name="sayHelloResponse">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="greeting" type="xsd:string" />
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>
      <xsd:element name="registerUser">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="name" type="xsd:string" />
            <xsd:element name="email" type="xsd:string" />
            <xsd:element name="age" type="xsd:int" />
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>
      <xsd:element name="registerUserResponse">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="userId" type="xsd:string" />
            <xsd:element name="message" type="xsd:string" />
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>
    </xsd:schema>
  </types>
  <message name="sayHelloRequest">
    <part name="parameters" element="tns:sayHello" />
  </message>
  <message name="sayHelloResponse">
    <part name="parameters" element="tns:sayHelloResponse" />
  </message>
  <message name="registerUserRequest">
    <part name="parameters" element="tns:registerUser" />
  </message>
  <message name="registerUserResponse">
    <part name="parameters" element="tns:registerUserResponse" />
  </message>
  <portType name="MyPortType">
    <operation name="sayHello">
      <input message="tns:sayHelloRequest" />
      <output message="tns:sayHelloResponse" />
    </operation>
    <operation name="registerUser">
      <input message="tns:registerUserRequest" />
      <output message="tns:registerUserResponse" />
    </operation>
  </portType>
  <binding name="MyBinding" type="tns:MyPortType">
    <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http" />
    <operation name="sayHello">
      <soap:operation soapAction="http://example.com/myservice#sayHello" />
      <input>
        <soap:body use="literal" />
      </input>
      <output>
        <soap:body use="literal" />
      </output>
    </operation>
    <operation name="registerUser">
      <soap:operation soapAction="http://example.com/myservice#registerUser" />
      <input>
        <soap:body use="literal" />
      </input>
      <output>
        <soap:body use="literal" />
      </output>
    </operation>
  </binding>
  <service name="MyService">
    <port name="MyPort" binding="tns:MyBinding">
      <soap:address location="http://localhost:3000/soap" />
    </port>
  </service>
</definitions>
`;

// to test sign-up with soap
/*
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://example.com/myservice">
   <soapenv:Header/>
   <soapenv:Body>
      <tns:registerUser>
         <name>Imad</name>
         <email>imad@example.com</email>
         <age>25</age>
      </tns:registerUser>
   </soapenv:Body>
</soapenv:Envelope>
*/
//to test hello with soap
/*
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
   <soap:Body>
      <sayHelloResponse xmlns="http://example.com/myservice">
         <greeting>Hello, Imad!</greeting>
      </sayHelloResponse>
   </soap:Body>
</soap:Envelope>

*/
// إنشاء خادم HTTP وربطه بـ SOAP
const server = http.createServer(app);
soap.listen(server, "/soap", myService, wsdl);

server.listen("3000", () => {
  console.log("server running in port 3000");
});
