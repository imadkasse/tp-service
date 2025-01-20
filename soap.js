const express = require("express");
const soap = require("soap");
const http = require("http");

const app = express();

// زيد هنا أو شوف شات جيبيتي باش يضيفلك أمثلة
// هذي خاصة ب soap

// تعريف خدمات SOAP (المنطق)
const myService = {
  MyService: {
    MyPort: {
      sayHello: function (args) {
        return { greeting: `Hello, ${args.name}!` };
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
    </xsd:schema>
  </types>
  <message name="sayHelloRequest">
    <part name="parameters" element="tns:sayHello" />
  </message>
  <message name="sayHelloResponse">
    <part name="parameters" element="tns:sayHelloResponse" />
  </message>
  <portType name="MyPortType">
    <operation name="sayHello">
      <input message="tns:sayHelloRequest" />
      <output message="tns:sayHelloResponse" />
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
  </binding>
  <service name="MyService">
    <port name="MyPort" binding="tns:MyBinding">
      <soap:address location="http://localhost:3000/soap" />
    </port>
  </service>
</definitions>
`;

// إنشاء خادم HTTP وربطه بـ SOAP
const server = http.createServer(app);
soap.listen(server, "/soap", myService, wsdl);

server.listen("3000", () => {
  console.log("server running in port 3000");
});

// متنساش باش تهبط و تنسطالي Node js
// باتشغل مشروع soap دير => npm run start:soap
