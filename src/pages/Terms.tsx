import React from 'react';

const Terms = () => {
  return (
    <div>
      {/* Header */}
      <div className="bg-gray-900 py-16 bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center">
            <h1 className="text-4xl font-serif text-white mb-4">
              Terms and Conditions
            </h1>
          </div>
        </div>
      </div>

      {/* Terms Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="prose max-w-none">
              <p className="mb-6">
                Welcome to Zeemui Co Ltd. We are a leading independent property agency in Thailand, providing reliable real estate services in Asia. We offer safe and secure advice to clients worldwide, and a huge variety of listings, from condos and apartments, to villas, houses and land.
              </p>

              <p className="mb-6">
                In your continuity to browse our website, you are agreeing to comply by the following terms and conditions of use. You can also check out our privacy policy listed on our website for more information. Hence, if you disagree with any of these terms and conditions below, please do not use our website.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Terms of Use</h2>
              <ul className="list-disc pl-6 space-y-4 text-gray-700">
                <li>The content of the website is only for your general information and use only. We may change these Terms and Conditions at any time without notice.</li>
                <li>This website uses cookies to monitor your browsing preferences.</li>
                <li>This website contains material which is owned by us. Replication of the logo, design, content, layout, appearance and graphics is strictly prohibited.</li>
                <li>In case you want to use content, prior permission needs to be taken for your use, wherein the source of which must be acknowledged.</li>
                <li>Unauthorized usage of the website content may give result to claim for damages and/or be considered a criminal offense.</li>
                <li>The website may also include links to other third party websites for further information, of which we do not take any responsibility in regards to the content of the linked websites.</li>
                <li>Commissions: All commissions are paid by the owner or seller, not by the buyer or renter.</li>
              </ul>

              <p className="mt-8 text-gray-700">
                By reading the above you confirm to adhere to the terms & conditions of our website.
              </p>

              <p className="mt-6 text-gray-700">
                For more information you can write to us at: info@zeemui.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms; 