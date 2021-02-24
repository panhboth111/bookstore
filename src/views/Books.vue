<template>
  <v-container>
    <!-- dialog for adding new book -->
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-container>
          <v-card-title>Add a book</v-card-title>
          <v-form @submit.prevent="addBook">
            <v-text-field
              v-model="newBook.title"
              label="title"
              required
              outlined
            ></v-text-field>
            <v-text-field
              v-model="newBook.description"
              label="description"
              required
              outlined
            ></v-text-field>

            <v-btn type="submit" color="green" dark block>Create</v-btn>
            <v-btn @click="toggleDialog" color="red" outlined class="mt-2" block
              >Cancel</v-btn
            >
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
    <v-btn small dark @click="toggleDialog"
      ><v-icon>{{ icons.add }}</v-icon></v-btn
    >
    <!-- dialog for editing book -->
    <v-dialog v-model="editDialog" max-width="600">
      <v-card>
        <v-container>
          <v-card-title>Edit book</v-card-title>
          <v-form @submit.prevent="editBook">
            <v-text-field
              v-model="editingBook.title"
              label="title"
              required
              outlined
            ></v-text-field>
            <v-text-field
              v-model="editingBook.description"
              label="description"
              required
              outlined
            ></v-text-field>

            <v-btn type="submit" color="green" dark block>Save</v-btn>
            <v-btn
              @click="toggleEditDialog(false)"
              color="red"
              outlined
              class="mt-2"
              block
              >Cancel</v-btn
            >
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- content -->
    <div class="mt-5">
      <v-row>
        <v-col
          cols="12"
          sm="12"
          md="3"
          lg="3"
          xl="3"
          v-for="(b, i) in books"
          :key="i"
        >
          <v-card>
            <v-img :src="b.thumbnail" height="200px"></v-img>
            <v-card-title>
              {{ b.title }}
            </v-card-title>

            <v-card-subtitle> {{ b.description }} </v-card-subtitle>
            <v-card-actions>
              <v-btn
                color="green lighten-2"
                text
                @click="toggleEditDialog(true, b)"
              >
                Edit
              </v-btn>
              <v-btn color="red lighten-2" text @click="deleteBook(b.id)">
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mdiPlus as add } from "@mdi/js";
import { db } from "../main";
export default {
  data: () => ({
    icons: {
      add,
    },
    books: [],
    dialog: false,
    editDialog: false,
    newBook: {
      title: "",
      description: "",
      thumbnail: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
    },
    editingBook: {
      title: "",
      description: "",
      id: "",
      thumbnail: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
    },
  }),
  methods: {
    toggleDialog() {
      this.dialog = !this.dialog;
    },
    toggleEditDialog(state, b) {
      this.editDialog = state;
      this.editingBook = b;
    },
    async getBooks() {
      const snapshot = await db.collection("books").get();
      this.books = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
    },
    async addBook() {
      const result = await db.collection("books").add(this.newBook);
      this.books.push({ id: result.id, ...this.newBook });
      this.newBook = {
        name: "",
        lecturer: "",
        thumbnail: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
      };
      this.dialog = false;
    },
    async deleteBook(id) {
      await db
        .collection("books")
        .doc(id)
        .delete();
      this.books = this.books.filter((b) => b.id !== id);
    },
    async editBook() {
      await db
        .collection("books")
        .doc(this.editingBook.id)
        .set(this.editingBook);
      this.books = this.books.map((b) => {
        if (b.id == this.editingBook.id) {
          return this.editingBook;
        }
        return b;
      });
      this.editingBook = {
        title: "",
        description: "",
        id: "",
        thumbnail: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
      };
      this.editDialog = false;
    },
  },
  created() {
    this.getBooks();
  },
};
</script>

<style></style>
