import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

const Privacy = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.followersText}>ARTICLE 1: PREAMBLE</Text>
          <Text style={styles.followersText}>
            The purpose of this privacy policy is to inform users of the
            application: On how their personal data is collected. Personal data
            is any information that can be used to identify a user. This may
            include, but is not limited to: first and last names, age, e-mail
            address; On the rights they have concerning this data; Who is
            responsible for processing the personal data collected and
            processed; the recipients of this personal data; the application's
            cookie policy. This policy supplements the legal notice and the
            General Conditions of Use, which can be consulted by users at the
            following address.
          </Text>
          <Text style={styles.followersText}>
            ARTICLE 2: PRINCIPLES GOVERNING THE COLLECTION AND PROCESSING OF
            PERSONAL DATA
          </Text>
          <Text style={styles.followersText}>
            In accordance with Article 5 of European Regulation 2016/679,
            personal data is: Processed lawfully, fairly and transparently with
            regard to the data subject; Collected for specified (see Article 3.1
            hereof), explicit and legitimate purposes, and may not be further
            processed in a manner incompatible with those purposes; Adequate,
            relevant and limited to what is necessary for the purposes for which
            they are processed; accurate and, where necessary, kept up to date.
            All reasonable steps must be taken to ensure that personal data
            which is inaccurate, having regard to the purposes for which it is
            processed, is erased or rectified without delay; Kept in a form
            which permits identification of data subjects for no longer than is
            necessary for the purposes for which they are processed; Processed
            in such a way as to guarantee appropriate security of the data
            collected, including protection against unauthorized or unlawful
            processing and against accidental loss, destruction or damage, using
            appropriate technical or organizational measures. Processing is
            lawful only if, and insofar as, at least one of the following
            conditions is met: The data subject has consented to the processing
            of his/her personal data for one or more specific purposes; The
            processing is necessary for the performance of a contract to which
            the data subject is a party, or for the performance of
            pre-contractual measures taken at the data subject's request;
            Processing is necessary to comply with a legal obligation to which
            the data controller is subject; Processing is necessary to protect
            the vital interests of the data subject or of another natural
            person; Processing is necessary for the performance of a task
            carried out in the public interest or in the exercise of official
            authority vested in the controller; The processing is necessary for
            the purposes of the legitimate interests pursued by the controller
            or by a third party, unless the interests or fundamental rights and
            freedoms of the data subject which require the protection of
            personal data prevail, in particular where the data subject is a
            child.
          </Text>
          <Text style={styles.followersText}>
            ARTICLE 3: PERSONAL DATA COLLECTED AND PROCESSED WHEN BROWSING THE
            APPLICATION
          </Text>
          <Text style={styles.followersText}>
            Article 3.1: Data collected The personal data collected in the
            context of our activity is as follows: surname first name age email
            address password This data is collected and processed for the
            following purposes: Management of the customer area Article 3.2:
            Data collection method When you use our application, the following
            data is automatically collected: [List of data automatically
            collected when the user simply visits the application] Other
            personal data is collected when you perform the following operations
            on the platform: like a post react to a post create a channel reply
            to a message This data is kept by the data controller under
            reasonable security conditions, for a period of : *3 years The
            company may retain certain personal data beyond the above-mentioned
            periods in order to meet its legal or regulatory obligations.
            Article 3.3: Data hosting The JOIN application is hosted by : JOIN
            13 rue Théodore Blanc Contact join.us@gmail.com *Article 3.5 :
            Cookies policy History of interactions with posts
          </Text>
          <Text style={styles.followersText}>
            ARTICLE 4: DATA CONTROLLER AND DATA PROTECTION OFFICER
          </Text>
          <Text style={styles.followersText}>
            Article 4.1: The data controller Personal data is collected by JOIN,
            a company with capital of 10,000, registered under the number **RCS
            BORDEAUX B 517 403 572 **. The data controller can be contacted as
            follows: By post at the following address: 13 rue Théodore Blanc ;
            By telephone on 07 82 25 66 28 ; By e-mail: mathis.join@gmail.com.
            Article 4.2: The Data Protection Officer (DPO) The company's or
            manager's data protection delegate is : Mathis Ghidotti, Bruges, 07
            82 25 66 78, mathis.join@gmail.com If, after having contacted us,
            you feel that your "Informatique et Libertés" rights have not been
            respected, you can send a complaint to the CNIL.
          </Text>
          <Text style={styles.followersText}>
            ARTICLE 5: USERS' RIGHTS REGARDING DATA COLLECTION AND PROCESSING
          </Text>
          <Text style={styles.followersText}>
            All users concerned by the processing of their personal data may
            avail themselves of the following rights, pursuant to European
            Regulation 2016/679 and the French Data Protection Act (Law 78-17 of
            January 6, 1978): Right of access, rectification and right to
            erasure of data (laid down respectively in Articles 15, 16 and 17 of
            the RGPD) ; Right to data portability (article 20 of the RGPD);
            Right to limitation (Article 18 of the GDPR) and opposition to data
            processing (Article 21 of the GDPR); Right not to be subject to a
            decision based exclusively on an automated process ; Right to
            determine the fate of data after death; Right to have recourse to
            the competent supervisory authority (Article 77 of the RGPD). To
            exercise your rights, please send your letter to 13 Rue Théodore
            Blanc or by email to mathis.join@gmail.com In order for the data
            controller to comply with the user's request, the user may be
            required to provide certain information such as: first and last
            names, e-mail address and account, personal space or subscriber
            number. Visit cnil.fr for more information on your rights.
          </Text>
          <Text style={styles.followersText}>
            ARTICLE 6: CONDITIONS FOR MODIFYING THE PRIVACY POLICY
          </Text>
          <Text style={styles.followersText}>
            The publisher of the JOIN application reserves the right to modify
            this Policy at any time in order to ensure that users of the
            application comply with current legislation. Any modifications will
            not affect purchases previously made on the application, which
            remain subject to the Policy in force at the time of purchase and as
            accepted by the user at the time of purchase validation. The user is
            invited to familiarize himself/herself with this Policy each time
            he/she uses our services, without the need for formal notification.
            This policy, published on 22/01/2024, was updated on 23/01/2024.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
  },
  followersText: {
    fontSize: 15,
  },
  scrollView: {
    marginHorizontal: 20,
    flex: 1,
  },
});

export default Privacy;
