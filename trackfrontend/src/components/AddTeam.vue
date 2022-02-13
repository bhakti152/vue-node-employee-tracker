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
        <label for="startDate">Start Date</label>
        <input
        type="date"
          class="form-control"
          id="startDate"
          required
          v-model="team.startDate"
          name="startDate"
        />
      </div>
  <div class="form-group">
        <label for="endDate">End Date</label>
        <input
        type="date"
          class="form-control"
          id="endDate"
          required
          v-model="team.endDate"
          name="endDate"
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
        startDate:"",
        endDate:""
      },
    };
  },
  methods: {
    saveTeam() {
      var data = {
        name: this.team.name,
        startDate: this.team.startDate,
        endDate:this.team.endDate
      };

      TeamDataService.create(data)
        .then(response => {
          // this.team.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          this.$router.push({ name: "teams" });

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
