<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="team.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="joinDate">Join Date</label>
        <input
        type="date"
          class="form-control"
          id="joinDate"
          required
          v-model="team.joinDate"
          name="joinDate"
        />
      </div>
 
      <button @click="saveTeam" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTeam">Add</button>
    </div>
  </div>
</template>

<script>
import TeamDataService from "../services/TeamDataService";

export default {
  name: "add-team",
  data() {
    return {
      team: {
        name:"",
        joinDate:"",
        teamCode:""
      },
    };
  },
  methods: {
    saveTeam() {
      var data = {
        name: this.team.name,
        joinDate: this.team.joinDate,
        teamCode:this.$route.params.id
      };

      TeamDataService.createEmp(data)
        .then(response => {
          // this.team.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
this.$router.push('/teams')

})
        .catch(e => {
          console.log(e);
        });
    },
    
    newTeam() {
      this.submitted = false;
      this.team = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
