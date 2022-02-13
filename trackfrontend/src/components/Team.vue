<template>
  <div v-if="team" class="edit-form">
    <h4>Manage Team</h4>
    <form>
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
    </form>

 
    <button class="badge badge-danger mr-2"
      @click="deleteTeam"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateTeam"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Team...</p>
  </div>
</template>

<script>
import TeamDataService from "../services/TeamDataService";

export default {
  name: "team",
  data() {
    return {
      team: null,
      message: ''
    };
  },
  methods: {
    getTeam(id) {
      TeamDataService.get(id)
        .then(response => {
          this.team = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.team.id,
       status:status
      };

      TeamDataService.update(this.team.id, data)
        .then(response => {
          // this.team.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateTeam() {
      TeamDataService.update(this.team._id, this.team)
        .then(response => {
          console.log(response.data);
          this.message = 'The team was updated successfully!';
          this.$router.push({ name: "teams" });

        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteTeam() {
      TeamDataService.delete(this.team._id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "teams" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getTeam(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
