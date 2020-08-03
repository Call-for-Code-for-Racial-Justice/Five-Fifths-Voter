<template>
  <div class="bx--grid bx--grid--full-width landing-page">
    <div class="bx--row landing-page__r2">
      <div class="bx--col-lg-2">
        <cv-text-input
          label="First Name"
          v-model="firstName"
          placeholder="first name"
        />
      </div>
      <div class="bx--col-lg-2">
        <cv-text-input
          label="Last Name"
          v-model="lastName"
          placeholder="last name"
        />
      </div>
      <div class="bx--col-lg-2">
        <cv-dropdown placeholder="Fulton" label="County">
          <cv-dropdown-item value="001">APPLING</cv-dropdown-item>
          <cv-dropdown-item value="002">ATKINSON</cv-dropdown-item>
          <cv-dropdown-item value="003">BACON</cv-dropdown-item>
          <cv-dropdown-item value="004">BAKER</cv-dropdown-item>
          <cv-dropdown-item value="005">BALDWIN</cv-dropdown-item>
          <cv-dropdown-item value="006">BANKS</cv-dropdown-item>
          <cv-dropdown-item value="007">BARROW</cv-dropdown-item>
          <cv-dropdown-item value="008">BARTOW</cv-dropdown-item>
          <cv-dropdown-item value="009">BEN HILL</cv-dropdown-item>
          <cv-dropdown-item value="010">BERRIEN</cv-dropdown-item>
          <cv-dropdown-item value="011">BIBB</cv-dropdown-item>
          <cv-dropdown-item value="012">BLECKLEY</cv-dropdown-item>
          <cv-dropdown-item value="013">BRANTLEY</cv-dropdown-item>
          <cv-dropdown-item value="014">BROOKS</cv-dropdown-item>
          <cv-dropdown-item value="015">BRYAN</cv-dropdown-item>
          <cv-dropdown-item value="016">BULLOCH</cv-dropdown-item>
          <cv-dropdown-item value="017">BURKE</cv-dropdown-item>
          <cv-dropdown-item value="018">BUTTS</cv-dropdown-item>
          <cv-dropdown-item value="019">CALHOUN</cv-dropdown-item>
          <cv-dropdown-item value="020">CAMDEN</cv-dropdown-item>
          <cv-dropdown-item value="021">CANDLER</cv-dropdown-item>
          <cv-dropdown-item value="022">CARROLL</cv-dropdown-item>
          <cv-dropdown-item value="023">CATOOSA</cv-dropdown-item>
          <cv-dropdown-item value="024">CHARLTON</cv-dropdown-item>
          <cv-dropdown-item value="025">CHATHAM</cv-dropdown-item>
          <cv-dropdown-item value="026">CHATTAHOOCHEE</cv-dropdown-item>
          <cv-dropdown-item value="027">CHATTOOGA</cv-dropdown-item>
          <cv-dropdown-item value="028">CHEROKEE</cv-dropdown-item>
          <cv-dropdown-item value="029">CLARKE</cv-dropdown-item>
          <cv-dropdown-item value="030">CLAY</cv-dropdown-item>
          <cv-dropdown-item value="031">CLAYTON</cv-dropdown-item>
          <cv-dropdown-item value="032">CLINCH</cv-dropdown-item>
          <cv-dropdown-item value="033">COBB</cv-dropdown-item>
          <cv-dropdown-item value="034">COFFEE</cv-dropdown-item>
          <cv-dropdown-item value="035">COLQUITT</cv-dropdown-item>
          <cv-dropdown-item value="036">COLUMBIA</cv-dropdown-item>
          <cv-dropdown-item value="037">COOK</cv-dropdown-item>
          <cv-dropdown-item value="038">COWETA</cv-dropdown-item>
          <cv-dropdown-item value="039">CRAWFORD</cv-dropdown-item>
          <cv-dropdown-item value="040">CRISP</cv-dropdown-item>
          <cv-dropdown-item value="041">DADE</cv-dropdown-item>
          <cv-dropdown-item value="042">DAWSON</cv-dropdown-item>
          <cv-dropdown-item value="043">DECATUR</cv-dropdown-item>
          <cv-dropdown-item value="044">DEKALB</cv-dropdown-item>
          <cv-dropdown-item value="045">DODGE</cv-dropdown-item>
          <cv-dropdown-item value="046">DOOLY</cv-dropdown-item>
          <cv-dropdown-item value="047">DOUGHERTY</cv-dropdown-item>
          <cv-dropdown-item value="048">DOUGLAS</cv-dropdown-item>
          <cv-dropdown-item value="049">EARLY</cv-dropdown-item>
          <cv-dropdown-item value="050">ECHOLS</cv-dropdown-item>
          <cv-dropdown-item value="051">EFFINGHAM</cv-dropdown-item>
          <cv-dropdown-item value="052">ELBERT</cv-dropdown-item>
          <cv-dropdown-item value="053">EMANUEL</cv-dropdown-item>
          <cv-dropdown-item value="054">EVANS</cv-dropdown-item>
          <cv-dropdown-item value="055">FANNIN</cv-dropdown-item>
          <cv-dropdown-item value="056">FAYETTE</cv-dropdown-item>
          <cv-dropdown-item value="057">FLOYD</cv-dropdown-item>
          <cv-dropdown-item value="058">FORSYTH</cv-dropdown-item>
          <cv-dropdown-item value="059">FRANKLIN</cv-dropdown-item>
          <cv-dropdown-item value="060">FULTON</cv-dropdown-item>
          <cv-dropdown-item value="061">GILMER</cv-dropdown-item>
          <cv-dropdown-item value="062">GLASCOCK</cv-dropdown-item>
          <cv-dropdown-item value="063">GLYNN</cv-dropdown-item>
          <cv-dropdown-item value="064">GORDON</cv-dropdown-item>
          <cv-dropdown-item value="065">GRADY</cv-dropdown-item>
          <cv-dropdown-item value="066">GREENE</cv-dropdown-item>
          <cv-dropdown-item value="067">GWINNETT</cv-dropdown-item>
          <cv-dropdown-item value="068">HABERSHAM</cv-dropdown-item>
          <cv-dropdown-item value="069">HALL</cv-dropdown-item>
          <cv-dropdown-item value="070">HANCOCK</cv-dropdown-item>
          <cv-dropdown-item value="071">HARALSON</cv-dropdown-item>
          <cv-dropdown-item value="072">HARRIS</cv-dropdown-item>
          <cv-dropdown-item value="073">HART</cv-dropdown-item>
          <cv-dropdown-item value="074">HEARD</cv-dropdown-item>
          <cv-dropdown-item value="075">HENRY</cv-dropdown-item>
          <cv-dropdown-item value="076">HOUSTON</cv-dropdown-item>
          <cv-dropdown-item value="077">IRWIN</cv-dropdown-item>
          <cv-dropdown-item value="078">JACKSON</cv-dropdown-item>
          <cv-dropdown-item value="079">JASPER</cv-dropdown-item>
          <cv-dropdown-item value="080">JEFF DAVIS</cv-dropdown-item>
          <cv-dropdown-item value="081">JEFFERSON</cv-dropdown-item>
          <cv-dropdown-item value="082">JENKINS</cv-dropdown-item>
          <cv-dropdown-item value="083">JOHNSON</cv-dropdown-item>
          <cv-dropdown-item value="084">JONES</cv-dropdown-item>
          <cv-dropdown-item value="085">LAMAR</cv-dropdown-item>
          <cv-dropdown-item value="086">LANIER</cv-dropdown-item>
          <cv-dropdown-item value="087">LAURENS</cv-dropdown-item>
          <cv-dropdown-item value="088">LEE</cv-dropdown-item>
          <cv-dropdown-item value="089">LIBERTY</cv-dropdown-item>
          <cv-dropdown-item value="090">LINCOLN</cv-dropdown-item>
          <cv-dropdown-item value="091">LONG</cv-dropdown-item>
          <cv-dropdown-item value="092">LOWNDES</cv-dropdown-item>
          <cv-dropdown-item value="093">LUMPKIN</cv-dropdown-item>
          <cv-dropdown-item value="094">MACON</cv-dropdown-item>
          <cv-dropdown-item value="095">MADISON</cv-dropdown-item>
          <cv-dropdown-item value="096">MARION</cv-dropdown-item>
          <cv-dropdown-item value="097">MCDUFFIE</cv-dropdown-item>
          <cv-dropdown-item value="098">MCINTOSH</cv-dropdown-item>
          <cv-dropdown-item value="099">MERIWETHER</cv-dropdown-item>
          <cv-dropdown-item value="100">MILLER</cv-dropdown-item>
          <cv-dropdown-item value="101">MITCHELL</cv-dropdown-item>
          <cv-dropdown-item value="102">MONROE</cv-dropdown-item>
          <cv-dropdown-item value="103">MONTGOMERY</cv-dropdown-item>
          <cv-dropdown-item value="104">MORGAN</cv-dropdown-item>
          <cv-dropdown-item value="105">MURRAY</cv-dropdown-item>
          <cv-dropdown-item value="106">MUSCOGEE</cv-dropdown-item>
          <cv-dropdown-item value="107">NEWTON</cv-dropdown-item>
          <cv-dropdown-item value="108">OCONEE</cv-dropdown-item>
          <cv-dropdown-item value="109">OGLETHORPE</cv-dropdown-item>
          <cv-dropdown-item value="110">PAULDING</cv-dropdown-item>
          <cv-dropdown-item value="111">PEACH</cv-dropdown-item>
          <cv-dropdown-item value="112">PICKENS</cv-dropdown-item>
          <cv-dropdown-item value="113">PIERCE</cv-dropdown-item>
          <cv-dropdown-item value="114">PIKE</cv-dropdown-item>
          <cv-dropdown-item value="115">POLK</cv-dropdown-item>
          <cv-dropdown-item value="116">PULASKI</cv-dropdown-item>
          <cv-dropdown-item value="117">PUTNAM</cv-dropdown-item>
          <cv-dropdown-item value="118">QUITMAN</cv-dropdown-item>
          <cv-dropdown-item value="119">RABUN</cv-dropdown-item>
          <cv-dropdown-item value="120">RANDOLPH</cv-dropdown-item>
          <cv-dropdown-item value="121">RICHMOND</cv-dropdown-item>
          <cv-dropdown-item value="122">ROCKDALE</cv-dropdown-item>
          <cv-dropdown-item value="123">SCHLEY</cv-dropdown-item>
          <cv-dropdown-item value="124">SCREVEN</cv-dropdown-item>
          <cv-dropdown-item value="125">SEMINOLE</cv-dropdown-item>
          <cv-dropdown-item value="126">SPALDING</cv-dropdown-item>
          <cv-dropdown-item value="127">STEPHENS</cv-dropdown-item>
          <cv-dropdown-item value="128">STEWART</cv-dropdown-item>
          <cv-dropdown-item value="129">SUMTER</cv-dropdown-item>
          <cv-dropdown-item value="130">TALBOT</cv-dropdown-item>
          <cv-dropdown-item value="131">TALIAFERRO</cv-dropdown-item>
          <cv-dropdown-item value="132">TATTNALL</cv-dropdown-item>
          <cv-dropdown-item value="133">TAYLOR</cv-dropdown-item>
          <cv-dropdown-item value="134">TELFAIR</cv-dropdown-item>
          <cv-dropdown-item value="135">TERRELL</cv-dropdown-item>
          <cv-dropdown-item value="136">THOMAS</cv-dropdown-item>
          <cv-dropdown-item value="137">TIFT</cv-dropdown-item>
          <cv-dropdown-item value="138">TOOMBS</cv-dropdown-item>
          <cv-dropdown-item value="139">TOWNS</cv-dropdown-item>
          <cv-dropdown-item value="140">TREUTLEN</cv-dropdown-item>
          <cv-dropdown-item value="141">TROUP</cv-dropdown-item>
          <cv-dropdown-item value="142">TURNER</cv-dropdown-item>
          <cv-dropdown-item value="143">TWIGGS</cv-dropdown-item>
          <cv-dropdown-item value="144">UNION</cv-dropdown-item>
          <cv-dropdown-item value="145">UPSON</cv-dropdown-item>
          <cv-dropdown-item value="146">WALKER</cv-dropdown-item>
          <cv-dropdown-item value="147">WALTON</cv-dropdown-item>
          <cv-dropdown-item value="148">WARE</cv-dropdown-item>
          <cv-dropdown-item value="149">WARREN</cv-dropdown-item>
          <cv-dropdown-item value="150">WASHINGTON</cv-dropdown-item>
          <cv-dropdown-item value="151">WAYNE</cv-dropdown-item>
          <cv-dropdown-item value="152">WEBSTER</cv-dropdown-item>
          <cv-dropdown-item value="153">WHEELER</cv-dropdown-item>
          <cv-dropdown-item value="154">WHITE</cv-dropdown-item>
          <cv-dropdown-item value="155">WHITFIELD</cv-dropdown-item>
          <cv-dropdown-item value="156">WILCOX</cv-dropdown-item>
          <cv-dropdown-item value="157">WILKES</cv-dropdown-item>
          <cv-dropdown-item value="158">WILKINSON</cv-dropdown-item>
          <cv-dropdown-item value="159">WORTH</cv-dropdown-item>
        </cv-dropdown>
      </div>
      <div class="bx--col-lg-2">
        <cv-date-picker
          date-label="Date of Birth"
          pattern="\d{12}/\d{12}/\d{4}"
          placeholder="mm/dd/yyyy"
          v-model="dob"
        >
        </cv-date-picker>
      </div>
    </div>
    <div class="bx--row landing-page__r3">
      <div class="bx--col-md-4 bx--col-lg-4">
        <router-link
          :to="{
            name: 'reg-page',
            params: { regData: { firstName: this.firstName } }
          }"
        >
          <cv-button>Check Your Status</cv-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      yourName: '',
      firstName: '',
      lastName: '',
      dob: '',
      visible: false
    };
  },
  methods: {
    onClick() {
      this.visible = true;
    },
    modalClosed() {
      this.visible = false;
    }
  }
};
</script>

<style lang="scss">
@import './carbon-overrides';
@import '../../styles/carbon-utils';
</style>
