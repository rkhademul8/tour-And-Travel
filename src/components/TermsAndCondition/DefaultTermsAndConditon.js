import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export const DefaultTermsAndConditon = () => {
  const [companyName, setCompanyName] = useState("");
  const [agentId, setAgentId] = useState("");
  const [siteConfig, setSiteConfig] = useState({});
  useEffect(() => {
    //todo: fetching the data
    axios
      .get(
        `https://api.flyfarint.com/v.1.0.0/WhiteLabel/MyAccount/all.php?website=${window.location.hostname.replace(
          "www.",
          ""
        )}`
      )
      .then((res) => {
        setSiteConfig(res?.data);
        setAgentId(res?.data?.agentId);
        setCompanyName(res?.data?.company_name);
      });
  }, []);
  return (
    <Container style={{ padding: "0" }}>
      <Box
        sx={{
          margin: "10px 0px",
          "& h2": {
            color: "var(--primary-color)",
            fontSize: "26px",
            fontWeight: 400,
            paddingBottom: "20px",
          },
          "& h4": {
            color: "var(--secondary-color)",
            fontSize: "20px",
            padding: "10px 0px",
          },
        }}
      >
        {/* <h2>Terms and Condition </h2> */}

        <Box my={4}>
          <Typography
            style={{
              textAlign: "center",
              background: "var(--lightBlue)",
              fontSize: "18px",
              color: "var(--refundalbe-color)",
              padding: "4px 0px",
              borderRadius: "3px",

              fontWeight: "500",
            }}
          >
            Terms and Condition
          </Typography>
        </Box>

        <Box className="general-terms">
          <Box className="terms-body">
            <h4>General Terms</h4>

            <p>
              Please be informed that, by registering on our B2B Portal of{" "}
              {companyName} Agent, you are agreeing to accept all of our terms
              and conditions.
            </p>
            <p>
              By accessing, using or booking through our portal means that you
              have agreed to the terms and conditions that we set out below.
            </p>

            <p>
              The information provided on our booking platform must be truthful,
              accurate and updated. Our supplier reserves the sole right to
              cancel bookings without refund when incorrect information has been
              provided.
            </p>
            <p>
              We may terminate your account anytime, with or without notice, if
              we find you to conduct any activity that is in breach of these
              Terms, and if we believe that to be harmful to our business, or
              for conduct where the use of the Service is harmful to any other
              party. {companyName} authorities do not encourage the B2B agents
              to keep an extra amount of money in the agent's account. If the
              b2b agent keeps the more or an extra amount of money in their
              account then they will not be able to withdraw the extra amount
              which is kept in the {companyName} Agent portal. Whenever
              required, the agent can utilize the amount of money by issuing
              tickets or availing any of the services. {companyName} authority
              preserves the right to release or hold the amount based on
              different situations.
            </p>
            <p>
              If any of our services have any additional terms specific to the
              service, those terms will be specified in the product details
              page, and you will be responsible to read them before booking.
            </p>
            <p>
              We may, in our sole discretion, change or modify these Terms at
              any time, with or without notice. You are responsible to read this
              document from time to time to ensure that your use of the Service
              remains in compliance with these Terms.
            </p>
          </Box>

          <Box className="terms-body">
            <h4>{companyName} Services</h4>
            <p>
              {companyName} provides flight, hotel, holiday, visa, tours and
              transfers to its B2B clients. Getting a service from us on any of
              these service categories will depend on its availability.
            </p>
            <p>
              We reserve the right to modify, change, or discontinue any aspect
              of the Services at any time.
            </p>
            <h4>TERMS AND CONDITIONS FOR THE PROVIDING OF SERVICES</h4>
            <p>By using this site you agree to understand that {companyName}</p>
            <p>
              Any loss of or damage to property or injury to any person caused
              by reason of any defect, negligence, or other wrongful act of
              omission of, or any failure of performance of any kind by any
              Travel Supplier.
            </p>
            <p>
              Any inconvenience, loss of enjoyment, mental distress or other
              similar matter. Any delayed departure, missed connections,
              substitutions of accommodations, terminations of service, or
              changes in fares and rates.
            </p>
            <p>
              Any cancellation or double-booking of reservations or tickets
              beyond the reasonable control of ShareTrip.
            </p>
            <p>
              Any claim of any nature arising out of or in connection with air
              or other transportation services, products or other features
              performed (or not) or occurring (or not) in connection with your
              itinerary.
            </p>
            <h4>Booking</h4>
            <p>
              You should book any service with accurate information of the
              customer, after booking any kind of information change may not be
              allowed.
            </p>
            <p>
              When we place Service Elements on our Site, we are inviting you to
              make an offer for their purchase. You do not make this offer until
              you press Book
            </p>
            <p>
              If the relevant Service Element is available, your Booking will be
              processed. The contract pertaining to the relevant Booking is
              formed when payment in full has been received. The contract
              between you and the relevant Travel Supplier will relate only to
              those Service Elements confirmed by email with ticket numbers in
              case of air or reservation numbers in case of hotels, cars or
              activities.
            </p>
          </Box>

          <Box className="terms-body">
            <h4>Cancellations</h4>
            <p>
              We provide cancellation or amendment deadlines along with any
              cancellation charges that may apply if canceled or amended after
              the Deadline. Please read it carefully prior to any booking.
            </p>
            <h4>No Shows</h4>
            <p>
              No show by the guest at any service without prior information
              shall be considered a cancellation for Hotel, Tours & Transfer &
              for Flight as per Airline/Supplier policy No refunds will be
              applicable in the case of no shows for Hotel, Tours & Transfer &
              for Flight as per Airline/Supplier policy.
            </p>
            <h4>Re-Issue/Date Change</h4>
            <p>
              R-issue or Date change of any service will be as per supplier’s
              policy.
            </p>
            <h4>Refund</h4>
            <p>
              The amount will be credited to the Agent ID as per Airlines Rules,
              printed on the Issued Air Tickets. Necessary Charges will be
              deducted as per Banks and Airlines policies.
            </p>
            <h4>Rates & Currency</h4>
            <p>
              All the rates presented on our website are inclusive of all taxes
              and service charges except any city taxes, resort fee or other
              charges directly payable at the hotel by the guests. You will be
              responsible to go through the breakdown of the rate before booking
              any service.
            </p>
            <p>
              Rates displayed on the {companyName} website are subject to
              currency fluctuations. There may be slight variations in the
              published rates on a daily basis that will reflect any movement in
              the currency exchange rates. Once your booking is complete and you
              are charged, there is no refund for the price difference, because
              rates can change/fluctuate at any time without any notification as
              these rates run totally on a real time basis globally .
            </p>
            <h4>No Liability for Onward Sales</h4>
            <p>
              We cannot be held responsible for your clients purchasing travel
              services from you. The resell of our travel services is solely
              your responsibility. We do not accept any liability for Onward
              Sales to a client nor do we accept liability for anything which
              may go wrong with a travel service. We are also not responsible
              for any dispute between you and your client arising from the
              onward sale of a travel service.
            </p>
            <p>
              We only show information that we get from our suppliers, you are
              responsible to reconfirm those to your clients prior to charging
              him/her
            </p>
            <p>
              If your customer is denied by any immigration to enter any country
              & imposed any fine for false VISA or any passport related issues
              or any reason you have to pay the fine. Flight
            </p>
            <p>
              You can book tickets to all over the world using our website.
              Please note that seats, meals, frequent flyer and other special
              requests are requests only. The airline reserves the right to
              apply any revisions to the requested seat allocation without
              notification. All requests should be verified with the airline. We
              do not guarantee you will be assigned the seat you have requested.
              We also do not guarantee that meals, frequent flyer and other
              special requests will be confirmed by the airline. It is therefore
              recommended to contact the airline directly to confirm these
              requests.
            </p>
            <p>
              If your customers have excess baggage, will have to pay any excess
              baggage fee assessed by each airline. When there are two or more
              airlines involved for connecting flights, they may have to reclaim
              bags at the connecting airport and check-in again to continue the
              journey. In these cases, if excess baggage, will have to pay any
              excess baggage fee assessed by each airline. We recommend
              traveling light to reduce these costs.
            </p>
            <p>
              All Airlines have differing rules and policies regarding schedule
              changes, which are beyond our control. Due to the operational
              needs of each airline, changes are often made to the flights that
              they are currently operating. Often these changes are a prediction
              of travel needs for a future date but can also reflect same day
              changes. {companyName} does not assume any liability whatsoever
              for canceled flights, flights that are missed, or flights not
              connecting due to any scheduled changes made by the airlines. We
              will inform you about the changes after being notified from
              Airlines or Suppliers that it’s your responsibility to inform your
              customer about changes.
            </p>

            <h4>Holiday</h4>
            <p>
              Package rates are valid as per our mentioned validity dates and
              for the room category specified. Should the period of stay or room
              type change, above rates will not be valid. Hotel rates are not
              valid during trade fairs, exhibitions, blackout periods, and
              special events. A surcharge will be levied in those cases.
            </p>
            <p>
              Photos of the hotel and information provided regarding the
              service, amenities, products, etc. have been provided to us by the
              supplier. {companyName} accepts NO RESPONSIBILITY for any changes
              that the supplier has not updated. Specific features such as
              bedding type or non-smoking rooms are simply a request and not
              guaranteed unless otherwise specified by the hotel. While most
              hotels will strive to honor your requests, neither
              {companyName} nor the hotel will guarantee that your request will
              be honored.
            </p>
            <p>
              No amendment (name changes, date changes, hotel change, etc) will
              be done once the booking is confirmed.
            </p>

            <h4>Visa</h4>
            <p>
              {companyName} process visa for all popular destinations worldwide.
              For places where the submission has to be by the individuals, we
              only process the papers for the client. Clients shall have to face
              embassy interviews by themselves if needed. We also do not provide
              any assurance of getting a visa, as that depends solely on the
              embassy. In order to have a higher chance of getting visa, clients
              are suggested to-
            </p>
            <li>Provide accurate documents to us.</li>
            <li>Share only true information.</li>
            <li>Not hide any information.</li>
            <li>
              Provide any additional documents requested as supporting
              documents.
            </li>
            <li>
              Passport should have at least 7 months validity before applying
              for visa. Customers will be responsible for checking the passport
              validity before applying.
            </li>
            <li>
              Visa fee and our service charge are strictly not refundable even
              if the client does not get the visa.
            </li>
          </Box>

          <Box className="terms-body">
            <h4>Prohibited Activities</h4>
            <p>When booking services, you are agreeing not to:</p>
            <p>Use the contents of this website anywhere else.</p>
            <p>Make any false or fraudulent reservation.</p>
            <p>Copy any part of this website without proper permission.</p>
            <p>
              If {companyName} finds any suspicious, or fraudulent booking,
              booked under a false name, we reserve the right to cancel the
              booking immediately and block the email, phone number that are
              associated with that particular account from our website.
              ShareTrip reserves the right to take legal action if needed, in
              case of any fraudulent activity. If you think your account has
              been blocked by any mistake, we request you to contact our
              customer service with proper verifiable documents. Reach our
              customer service by calling <span>+8809606912912 </span> or send
              email to <span>reservation@flyfarint.com</span>
            </p>
            <h4>Disclaimers</h4>
            <p>
              By booking any service from our B2B portal, you acknowledge and
              agree to have read, understood, and agreed to the terms and
              conditions. Disagreement to any of the terms and conditions stated
              above will not be considered after booking any service through{" "}
              {companyName}.
            </p>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
