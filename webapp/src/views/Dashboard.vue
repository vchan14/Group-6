<template>
  <div v-if="this.$store.dispatch('authorized', 2)" class="section" >
    <div id="accountInfo">
      <p>
        <b>Name:</b> {{this.$store.state.loginState.user.firstname + " " + this.$store.state.loginState.user.lastname}}<br>
        <b>Email:</b> {{this.$store.state.loginState.user.email}}<br>
        <b>Account Permissions:</b> {{this.permStr[this.$store.state.loginState.user.permission]}}<br>
      </p>
    </div>
    <div id="manage-nav">
      <router-link to="/manage/staff">
        <div class="manageLink" v-if="this.$store.state.loginState.user.permission <= 0">Manage Staff</div>
      </router-link>
      <router-link to="/manage/orders" v-if="this.$store.state.loginState.user.permission <= 2">
        <div class="manageLink">Manage Orders</div>
      </router-link>
      <router-link to="/manage/banner" v-if="this.$store.state.loginState.user.permission <= 1">
        <div class="manageLink">Manage Banners</div>
      </router-link>
      <router-link :to="{name: 'spices', params: {id: 0}}" v-if="this.$store.state.loginState.user.permission <= 1">
        <div class="manageLink">Manage Spices</div>
      </router-link>
    </div>
    <hr>
    <h1>Unclaimed Orders</h1>
    <Order v-if="showToEmp(order)" v-for="order in unclaimedOrders" :key="order.id" v-bind="order"/>
    <h1>Your Orders</h1>
    <Order v-if="showToEmp(order)" v-for="order in userOrders" :key="order.id" v-bind="order"/>
    <hr>
    <br/>
    <section v-if="this.$store.state.loginState.user.permission <= 1">
      <b-field label="Create New Alert">
        <b-input type="textarea" v-model="text" />
      </b-field>
      <button v-on:click="createAlert">Submit</button>
    </section>
    <div>
      <b>Announcements</b>
      <Alert v-for="i in alerts.length" v-bind:author="alerts[alerts.length-i].author" v-bind:text="alerts[alerts.length-i].text" v-bind:timestamp="alerts[alerts.length-i].time" />
    </div>
    <!-- <Order v-for="order in orders" :key="order" v-bind="order"/> -->
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Order from "@/components/Order.vue"
import Alert from "@/components/Alert.vue"

export default {
  name: "dashboard",
  components: {
    Order,
    Alert
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    },
    userOrders() {
      return this.$store.state.orders.filter(order => {
        return (order.staff_id == this.$store.state.loginState.user.id)
      })
    },
    unclaimedOrders() {
      return this.$store.state.orders.filter(order => {
        return (order.staff_id < 0)
      })
    }
  },
  created() {
    this.$store.dispatch("getAlerts").then((response) => {
      this.alerts = response;
    });
      this.$store.dispatch("getAllOrders");
  },
  data() {
    return {
      permStr: ["Owner", "Admin", "Staff", "Error"],
      alerts: [],
      text: ""
    }
  },
  methods: {
    createAlert: function(){
      this.$store.dispatch("createAlert", {text: this.text}).then((response) => {
        this.alerts.push(response);
        this.text = "";
      });
    },
    showToEmp: function(order) {
      return order.order_status > 0;
    }
  }
};
</script>

<style scoped>
#accountInfo {
  background-color: white;
  border: solid 1px black;
}

#manage-nav {
  display: inline-block;
}

.manageLink {
  float:left;
  margin-left: -1px;
  margin-top: 5px;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0);
  border: solid 1px #7aa256;
  border-radius: 0;
  color: #7aa256;
  cursor: pointer;
}

.manageLink:hover {
  color: #9ad466;
}

button {
  margin-left: -1px;
  margin-top: 5px;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0);
  border: solid 1px #7aa256;
  border-radius: 0;
  color: #7aa256;
  cursor: pointer;
}

hr {
  margin: 10px;
  background-color: darkgray;
  display: block;
  width: 100%;
  height: 1px;
}

ul {
  list-style-type: none;
  padding: 10px;
}
li {
  display: inline-block;
  margin: 10px;
}

h1 {
  font-size: 12pt;
  font-weight: bold;
}
</style>
