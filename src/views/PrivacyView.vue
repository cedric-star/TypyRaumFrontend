<script setup lang="ts">

import GenericCard from "@/misc/GenericCard.vue";
</script>

<template>
  <div id="big-wrap">
    <GenericCard>
      <template v-slot:header>
        Datenschutzerklärung
      </template>
      Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten
      personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies, soweit
      möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte
      weitergegeben. Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht
      ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen.
      Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von
      Werbeinformationen, etwa durch Spam-Mails, vor.
    </GenericCard>

    <GenericCard>
      <template v-slot:header>
        Datenhaltung & Hosting
      </template>

      <h3>Hosting</h3>
      Jeglicher Datenverkehr dieser Webseite findet über die Server der STRATO GmbH statt.
      Alle Nutzerkonten, sowie die dazugehörigen Daten, werden ebenfalls auf den genannten Servern gespeichert.
      Weitere Informationen zu STRATO und die Einhaltung von Sicherheitsstandards kann unter folgendem
      Link gefunden werden: <a href="https://www.strato.de/sicherheit/">STRATO Sicherheitsbestimmungen</a>

      <h3>Cookies</h3>
      Wir setzen keine Tracking-Cookies zu Werbezwecken ein.

      <h3>Datenübertragung</h3>
      Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail)
      Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.

      <h3>Kartendaten</h3>
      Die genutzten Kartendaten unterstehen der Datenlizenz Deutschland Version 2.0 (siehe www.govdata.de/dl-de/by-2-0).<br>
      Bereitsteller der Daten: © GeoBasis-DE / LVermGeo ST <br>
      Link zum Datensatz: https://www.lvermgeo.sachsen-anhalt.de/de/gdp-dop-100-auswahl.html
    </GenericCard>

    <GenericCard>
      <template v-slot:header>
        Ihre Daten
      </template>
      Sie haben jederzeit das Recht auf Auskunft über ihre gespeicherten personenbezogenen Daten.
      Ebenfalls haben sie das Recht auf die Löschung oder Anpassung ihrer Daten.
      Wenden sie sich in diesen Fällen an uns über die im Impressum angegebenen Kontakdaten. <br>
      <RouterLink to="/about">Link zum Impressum</RouterLink>
    </GenericCard>
  </div>
</template>

<style scoped>
#big-wrap {
  height: 100dvh;
  overflow: scroll;
}
</style>