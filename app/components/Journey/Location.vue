<template>
  <div
    class="group flex max-w-xl flex-col gap-2 rounded-lg bg-ff-pink-01 p-1 text-white"
    :class="{ 'is-expanded': expanded }"
    tabindex="1"
  >
    <div
      class="flex cursor-pointer items-center justify-between"
      @click="toggle()"
    >
      <div class="text-1xl relative left-1 top-1 font-semibold">
        {{ locationName }}
      </div>
      <button class="relative">
        <chevron
          class="transition-all duration-500 group-[.is-expanded]:-rotate-180"
        />
      </button>
    </div>
    <div
      class="invisible h-auto max-h-0 items-center opacity-0 transition-all
        group-[.is-expanded]:visible group-[.is-expanded]:max-h-screen
        group-[.is-expanded]:opacity-100 group-[.is-expanded]:duration-1000
        data-[expanded=true]:visible data-[expanded=true]:max-h-screen
        data-[expanded=true]:opacity-100"
    >
      <div class="bg-ff-white-01 p-1 text-ff-purple-01">
        <div v-if="addressLines">
          {{ addressLines }}
        </div>

        <div
          v-if="addressLines"
          class="mt-1"
        >
          <cv-link
            :href="directionsLink(addressLines)"
            target="_blank"
          >
            <div><map-icon /></div>
            <div class="ml-2 flex items-center">
              {{ $t("mapDirections") }}
            </div>
          </cv-link>
        </div>
        <div
          v-if="location.notes"
          class="mt-1 text-[16px]"
        >
          {{ location.notes }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Map32 as MapIcon, ChevronDown16 as Chevron } from "@carbon/icons-vue";

const props = defineProps({
  location: { type: Object, required: true },
  id: { type: String, required: true },
});

const expandedLocation = inject("expanded-location", ref(""));
const expanded = ref(false);
function toggle() {
  expanded.value = !expanded.value;
  if (expanded.value) expandedLocation.value = props.id;
}
watch(
  expandedLocation,
  () => {
    if (expandedLocation.value && expandedLocation.value !== props.id) {
      setTimeout(() => (expanded.value = false), 250);
    }
  },
  { flush: "post" },
);

const locationName = computed(() => {
  return props.location.address?.locationName || "location";
});
function addAddressPart(partial, part) {
  if (part) {
    if (partial === undefined) partial = part;
    else if (partial.length > 0) partial += " " + part;
    else partial += part;
  }
  return partial;
}
const addressLines = computed(() => {
  let address = addAddressPart(undefined, props.location.address?.line1);
  address = addAddressPart(address, props.location.address?.line2);
  address = addAddressPart(address, props.location.address?.line3);
  address = addAddressPart(address, props.location.address?.city);
  address = addAddressPart(address, props.location.address?.state);
  address = addAddressPart(address, props.location.address?.zip);

  return address;
});

function directionsLink(address) {
  const escapedValue = encodeURIComponent(address).replaceAll("%20", "+");
  return "https://www.google.com/maps/search/?api=1&query=" + escapedValue;
}
</script>
