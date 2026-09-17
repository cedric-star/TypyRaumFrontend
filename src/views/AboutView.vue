<script setup lang="ts">
import GenericCard from "@/misc/GenericCard.vue";
</script>

<template>
  <div id="big-wrap">
    <GenericCard>
      <template v-slot:header>
        Projektinformation
      </template>
      Dieses Projekt entstand im Rahmen der Veranstaltung Raumbezogene Dienste und Anwendungen an der Hochschule Harz, Fachbereich Automatisierung und Informatik. <br>
      Dozent: Dr. Christian Aden
    </GenericCard>
    <GenericCard>
      <template v-slot:header>
        Angaben gemäß § 5 DDG
      </template>
      <h3>Anschrift des Dienstanbieters</h3>
      Remilia Victorine Unterschütz <br>
      Bahnhofstraße 33 <br>
      39104 Magdeburg <br>
      <h3>Kontaktdaten</h3>
      E-Mail: rem-unt@proton.me
    </GenericCard>
    <GenericCard>
      <template v-slot:header>
        Haftung für Inhalte
      </template>
      Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität
      der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene
      Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
      Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder
      nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder
      Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche
      Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
      von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
    </GenericCard>
    <GenericCard>
      <template v-slot:header>
        Haftung für Links
      </template>
      Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben.
      Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist
      stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
      Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
      Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
      Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer
      Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend
      entfernen.
    </GenericCard>
    <GenericCard>
      <template v-slot:header>
        Urheberrecht
      </template>
      Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.
      Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
      bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind
      nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom
      Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
      gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
      entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
    </GenericCard>
  </div>
</template>

<style scoped>
#big-wrap {
  height: 100dvh;
  overflow: scroll;
}
</style>