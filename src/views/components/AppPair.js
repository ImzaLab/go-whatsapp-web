export default {
    name: 'AppPair',
    data() {
        return {
            phone: '',
            linking_code: '',
        }
    },
    methods: {
        async openModal() {
            $('#modalPair').modal({
                onApprove: function () {
                    return false;
                }
            }).modal('show');
        },
        async handleSubmit() {
            try {
                this.loading = true;
                let response = await this.submitApi()
                let results = response.data.results;
                this.linking_code = results.linking_code;
            } catch (err) {
                showErrorInfo(err)
            } finally {
                this.loading = false;
            }
        },
        async submitApi() {
            console.log("submitApi");
            this.loading = true;
            try {
                const payload = {
                    phone: this.phone,
                }

                return  await window.http.post(`/app/pair`, payload)
            } catch (error) {
                if (error.response) {
                    throw new Error(error.response.data.message);
                }
                throw new Error(error.message);
            } finally {
                this.loading = false;
            }
        },
        handleReset() {
            this.phone = '';
        },
    },
    template: `
    <div class="green card" @click="openModal" style="cursor: pointer">
        <div class="content">
            <div class="header">PairPhone</div>
            <div class="description">
                Pair your phone without QR code
            </div>
        </div>
    </div>
    
    <!--  Modal Login  -->
    <div class="ui small modal" id="modalPair">
        <i class="close icon"></i>
        <div class="header">
        PairPhone
        </div>
        <div class="image content">
           <form class="ui form">
                <div class="field">
                    <label>Phone / Group ID</label>
                    <input v-model="phone" type="phone" placeholder="6289..."
                            aria-label="phone">
                </div>
           </form>
                <div>Enter code to link new device</div>
                <p>
                Click notification > Confirm > Enter code
                <br>
                <i>Code is {{ linking_code }}</i>
                </p>

        </div>
        <div class="actions">
            <div class="ui approve positive right labeled icon button" @click="handleSubmit">
                Send
                <i class="send icon"></i>
            </div>
        </div>
    </div>
    `
}