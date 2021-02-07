<template>
  <cv-content id="#main-content">
    <div class="bx--grid bx--grid--full-width landing-page">
      <div class="bx--row landing-page__r2">
        <div class="bx--col-lg-16">
          <section>
            <aside class="content--register">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed varius ex,
                condimentum dapibus risus. Mauris sit amet lacus vitae elit tincidunt vestibulum at
                eget nisl. Nunc placerat pharetra hendrerit. In hac habitasse platea dictumst. Nunc
                a facilisis nibh. Nulla at massa sit amet urna rutrum tincidunt. Donec arcu nisl,
                ullamcorper eu gravida vitae, maximus ut quam. Donec enim ipsum, porta ut ligula id,
                posuere consectetur ligula. In id lacus ac mauris pharetra ultrices. Maecenas ornare
                mi lacus, ut porta arcu pretium vel. Quisque aliquet diam vitae posuere laoreet.
              </p>
              <p>
                Phasellus rhoncus elit quam, vel molestie augue mattis ut. Duis sed laoreet turpis,
                sit amet convallis dolor. Suspendisse vehicula lorem id odio pharetra, nec laoreet
                dolor commodo. In a turpis sit amet risus lobortis feugiat. Nulla eget vehicula
                libero, et maximus massa. Vivamus in tortor elit. Etiam eget diam ipsum. Proin eget
                volutpat dui. Nullam molestie consequat sem, quis imperdiet nunc imperdiet sed.
                Praesent sit amet ex vitae orci venenatis semper. Phasellus feugiat faucibus tortor
                non pulvinar. Etiam erat ligula, convallis ac nunc eget, tempus dictum felis.
              </p>
              <p>
                Phasellus tincidunt posuere est, a facilisis lectus rutrum vehicula. Etiam consequat
                mattis quam at ullamcorper. Etiam a facilisis libero. Curabitur convallis nisi
                tortor, in consequat neque semper ut. Ut id sem vitae mauris lacinia tempor in ut
                sem. Fusce posuere ac tellus vel dapibus. Mauris hendrerit, dui vel interdum
                accumsan, quam elit pulvinar nisi, nec interdum justo sapien sit amet leo. Donec
                vehicula nibh et mauris commodo luctus ac suscipit elit.
              </p>
              <p>
                Maecenas finibus mollis sapien, et porttitor nisl scelerisque vel. Sed sit amet
                tincidunt dolor. In suscipit, nulla ac congue consequat, odio est lobortis est, at
                eleifend ex diam id ipsum. Integer turpis purus, convallis ac hendrerit ullamcorper,
                scelerisque in velit. Cras tempus dolor purus, sed aliquet diam dapibus sit amet.
                Nunc nec velit arcu. Etiam et risus eu libero euismod vehicula. Aliquam nec turpis a
                enim suscipit consectetur. Suspendisse nunc odio, ultricies sed blandit at, accumsan
                quis turpis. Vestibulum ac interdum est. Integer eu orci eros. Sed at tempor elit.
                Sed eget tellus magna. In lectus ante, posuere eu elementum in, condimentum ut est.
                Nunc tristique mollis neque.
              </p>
              <p>
                Cras efficitur finibus mi, in aliquam lacus pulvinar eget. Ut a aliquet ligula. In
                hac habitasse platea dictumst. Quisque eu facilisis nisl, nec suscipit dolor.
                Vestibulum ornare libero at neque sodales sollicitudin. Sed id dapibus velit.
                Suspendisse at nisl suscipit, malesuada mauris ac, ultrices ex. Nam placerat et mi
                sed malesuada. Donec sit amet velit et ipsum rhoncus dignissim. Nam accumsan a
                tellus et eleifend. Sed ac viverra arcu.
              </p>
            </aside>
          </section>
        </div>
      </div>
    </div>
  </cv-content>
</template>

<script>
import router from '../../router';

export default {
  name: 'reg',
  data() {
    return {
      regData: {}
    };
  },
  created() {
    this.$amplitude.getInstance().logEvent('Page Visit', { page: 'Rating Page' });
  },
  methods: {
    navigate() {
      router.go(-1);
    }
  }
};
</script>
