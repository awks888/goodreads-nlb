import axios from 'axios'

export function searchNLB() {

  var xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cat="http://www.nlb.gov.sg/ws/CatalogueService">\
  <soapenv:Header/>\
  <soapenv:Body>\
     <cat:SearchRequest>\
        <cat:APIKey>RGV2LUtoYWlTaGVuZzpubGIhQCMyM0toYWk=</cat:APIKey>\
        <cat:SearchItems>\
           <cat:SearchItem>\
              <cat:SearchField>Author</cat:SearchField>\
              <cat:SearchTerms>John Steinbeck</cat:SearchTerms>\
           </cat:SearchItem>\
        </cat:SearchItems>\
        <cat:Modifiers>\
        </cat:Modifiers>\
     </cat:SearchRequest>\
  </soapenv:Body>\
</soapenv:Envelope>';


  axios.post('https://openweb.nlb.gov.sg/OWS/CatalogueService.svc?wsdl',
    xml,

    {
      headers:
      {
        'Content-Type': 'text/xml',
        SOAPAction: "http://www.nlb.gov.sg/ws/CatalogueService/ICatalogueService/Search"
      }
    }).then(res => {
      console.log(res);
    }).catch(err => { console.log(err.response.data) });

}




// var xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\
// xmlns:web="http://shaparak/">\
// <soapenv:Header/>\
// <soapenv:Body>\
// <SearchRequest>\
// <APIKey>RGV2LUtoYWlTaGVuZzpubGIhQCMyM0toYWk=</APIKey>\
// <SearchItems>\
// <SearchItem>\
// <SearchField>Author</SearchField>\
// <SearchTerms>John Steinbeck</SearchTerms>\
// </SearchItem>\
// </SearchItems>\
// <Modifiers>\
// <SortSchema></SortSchema>\
// <StartRecordPosition>1</StartRecordPosition>\
// <MaximumRecords>int</MaximumRecords>\
// <SetId>string</SetId>\
// </Modifiers>\
// </SearchRequest>\
// </soapenv:Body>\
// </soapenv:Envelope>';





