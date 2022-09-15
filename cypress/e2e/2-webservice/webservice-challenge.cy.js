/// <reference types="cypress" />

let endpoint = "https://api.staging.kiwibot.com/v1/requesters";
const requesterID = "3e77f61f-c434-4fb9-94d9-1699f5a1c14b";
const apiKey = "AIzaSyBoeZKquQlbxUzwzQLg_-pePYVZg6gT6IY";

// Quote object
const createQuoteObject = {
  rqUuid: "A51734D9-CC42-40D3-97E3-98BF446CAB27",
  dropoff_at: "2022-09-29T11:03:27-04:00",
  pickup_at: "2022-09-28T11:03:27-04:00",
  manifest: {
    items: [
      {
        quantity: 1,
        name: "i",
        value: 500,
      },
      {
        quantity: 1,
        name: "NewQuoteFromCypress",
        value: 2000,
      },
    ],
    description: "iwantjob",
    value: 1,
  },
  test: true,
  sandbox: false,
  pickup: {
    location_name: "Maryland",
    city: "Baltimore",
    country: "EU",
    email: "mdelgador24@gmail.com",
    instructions: "QA",
    lat: 39.3459,
    lon: -76.5832,
    name: "Miguel D",
    phone_number: "+584247304227",
    postal_code: "5015",
    state: "TACHIRA",
    street: "PALMIRA CALLE 8 CON CARRERA 9 LOS SAUCES PALMIRA",
  },
  dropoff: {
    location_name: "Maryland",
    lat: 39.3459,
    lon: -76.5832,
    street: "PALMIRA CALLE 8 CON CARRERA 9 LOS SAUCES PALMIRA",
    city: "Baltimore",
    state: "TACHIRA",
    country: "EU",
    postal_code: "21251",
    phone_number: "+580424730422'",
    name: "Miguel Delgado",
    email: "mdelgado24@gmail.com",
    instructions: "QA",
  },
};

// Delivary object
let createDeliveryObject = {
  webhook_url: "https://kiwibot-server-v2.herokuapp.com/kiwibot-tracker",
  external_id: "MD001",
};

// URL gerenation
let createQuoteUrl = setUrl("/quotes");
let createDeliveryUrl = setUrl("/deliveries");
let getDeliveryUrl = "";

function setUrl(url) {
  return `${endpoint}/${requesterID}${url ? url : ""}?key=${apiKey}`;
}

// Tests suites
context("Kiwibot-Webservice-test", () => {

/// Create quote 
  describe("Create Quote test", () => {
    it("Status request should be 201", () => {
      cy.request("POST", createQuoteUrl, createQuoteObject).then((response) => {
        createDeliveryObject.quote_id = response.body.id;
      }).its('status').should('eq',201);
    });
  });

/// Create delivery
  describe("Crete delivery test", () => {
    it("Status request should be 201", () => {
      cy.request("POST", createDeliveryUrl, createDeliveryObject).then(
        (response) => {
          getDeliveryUrl = setUrl(`/deliveries/${response.body.id}`);
        }
      ).its('status').should('eq',201);
    });
  });

/// Get
  describe("Get delivery test", () => {
    it("Status request should be 200", () => {
      cy.request("GET", getDeliveryUrl).then((response) => {
        console.log(response);
      }).its('status').should('eq',200);
    });
  });
});
