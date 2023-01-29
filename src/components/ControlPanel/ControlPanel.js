import Box from "@mui/material/Box";
import { Container } from "@mui/system";

import { UpdateCompanyInfo } from "./UpdateCompanyInfo";
import { UPdateWebsiteInfo } from "./UPdateWebsiteInfo";
import { UpdateWebsiteColor } from "./UpdateWebsiteColor";
import { UpdateWebsiteBanner } from "./UpdateWebsiteBanner";
import { UpdateSliderImages } from "./UpdateSliderImages";
import { UpdateHotDealImage } from "./UpdateHotDealImage";
import { UpdateFooter } from "./UpdateFooter";
import { UpdateWebsiteContract } from "./UpdateWebsiteContract";
import { UpdateTermsAndCondition } from "./UpdateTermsAndCondition";
import { UpdatePrivacyPolicy } from "./UpdatePrivacyPolicy";
import { UpdateRefundPolicy } from "./UpdateRefundPolicy";
import { UpdatePaymentMethod } from "./UpdatePaymentMethod";
import "./ControlPanel.css";
import { UpdateLongAboutUs } from "../UpdateLongAboutUs/UpdateLongAboutUs";

// https://cdn.flyfarint.com/WL/ML/IATA.png

const ControlPanel = () => {
  return (
    <Box>
      {/* <AdminHeader /> */}
      <Container style={{ padding: "0" }}>
        <Box>
          {/* //todo: Website Information Section */}
          <UPdateWebsiteInfo />
          {/* //todo: Company Information Section */}
          <UpdateCompanyInfo />
          {/* //todo: Website Color Section */}
          <UpdateWebsiteColor />
          {/* //todo: Main Banner Section */}
          <UpdateWebsiteBanner />
          {/* //todo: Slider Image Section */}
          <UpdateSliderImages />
          {/* //todo: hot Deal Section */}
          <UpdateHotDealImage />
          {/* //todo: Contact Section */}
          <UpdateWebsiteContract />
          {/* //todo: Update Terms & Condition Section */}
          <UpdateTermsAndCondition />
          {/* //todo: Update Privacy Policy Section */}
          <UpdatePrivacyPolicy />
          {/* //todo: Update Refund Policy Section */}
          <UpdateRefundPolicy />
          {/* //todo: Update About Us Long Section */}
          <UpdateLongAboutUs />
          {/* //todo: Update Payment Method Section */}
          {/* <UpdatePaymentMethod /> */}
          {/* //todo: Footer Section */}
          <UpdateFooter />
        </Box>
      </Container>
    </Box>
  );
};

export default ControlPanel;
