import axios from 'axios'
// import xmljs from 'xml-js'
var convert = require('xml-js');

// export function searchNLB() {

//   var xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cat="http://www.nlb.gov.sg/ws/CatalogueService">\
//   <soapenv:Header/>\
//   <soapenv:Body>\
//      <cat:SearchRequest>\
//         <cat:APIKey>RGV2LUtoYWlTaGVuZzpubGIhQCMyM0toYWk=</cat:APIKey>\
//         <cat:SearchItems>\
//            <cat:SearchItem>\
//               <cat:SearchField>Title</cat:SearchField>\
//               <cat:SearchTerms>Dune</cat:SearchTerms>\
//            </cat:SearchItem>\
//            <cat:SearchItem>\
//               <cat:SearchField>Author</cat:SearchField>\
//               <cat:SearchTerms>Frank</cat:SearchTerms>\
//            </cat:SearchItem>\
//         </cat:SearchItems>\
//         <cat:Modifiers>\
//         </cat:Modifiers>\
//      </cat:SearchRequest>\
//   </soapenv:Body>\
// </soapenv:Envelope>';

//   let data = ''

//   axios.post('https://openweb.nlb.gov.sg/OWS/CatalogueService.svc?wsdl',
//     xml,
//     {
//       headers:
//       {
//         'Content-Type': 'text/xml',
//         SOAPAction: "http://www.nlb.gov.sg/ws/CatalogueService/ICatalogueService/Search"
//       }
//     }).then(res => {
//       data = res.data
//       // console.log(res.data);
//       return data
//     }).catch(err => {
//       // console.log(err.response.data) 
//     });

// }




export async function searchNLB(): Promise<string> {

  var xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cat="http://www.nlb.gov.sg/ws/CatalogueService">\
  <soapenv:Header/>\
  <soapenv:Body>\
     <cat:SearchRequest>\
        <cat:APIKey>RGV2LUtoYWlTaGVuZzpubGIhQCMyM0toYWk=</cat:APIKey>\
        <cat:SearchItems>\
           <cat:SearchItem>\
              <cat:SearchField>Title</cat:SearchField>\
              <cat:SearchTerms>Of Mice and Men</cat:SearchTerms>\
           </cat:SearchItem>\
           <cat:SearchItem>\
              <cat:SearchField>Author</cat:SearchField>\
              <cat:SearchTerms>John</cat:SearchTerms>\
           </cat:SearchItem>\
           <cat:SearchItem>\
           <cat:SearchField>Author</cat:SearchField>\
           <cat:SearchTerms>Steinbeck</cat:SearchTerms>\
        </cat:SearchItem>\
        </cat:SearchItems>\
        <cat:Modifiers>\
        <cat:SortSchema>TITLE</cat:SortSchema>\
        </cat:Modifiers>\
     </cat:SearchRequest>\
  </soapenv:Body>\
</soapenv:Envelope>';

  const response = await axios.post<string>('https://openweb.nlb.gov.sg/OWS/CatalogueService.svc?wsdl',
    xml,
    {
      headers:
      {
        'Content-Type': 'text/xml',
        SOAPAction: "http://www.nlb.gov.sg/ws/CatalogueService/ICatalogueService/Search"
      }
    })

  if (response.status === 200) {
    const rawJSON = convert.xml2json(response.data, { compact: true, spaces: 4 })
    const convertedJSON = JSON.parse(rawJSON);
    const stringJSON = JSON.stringify(convertedJSON)
    return stringJSON
    // return response.data
  }
  throw new Error(response.statusText)

}




// .then(res => {
//   // data = res.data
//   console.log(res)
// }).catch(err => {
//   // console.log(err.response.data) 
// });