<template>
<div class="project_forum">
    <el-row>
        <el-col :span="24" class="title">
            <h1>项目讨论区</h1>
        </el-col>
    </el-row>

    <!-- 搜索框 -->
    <el-input v-model="searchText" placeholder="请输入标题"></el-input>

    <!-- 发帖 -->
    <el-form :model="newPost" class="post-form">
        <el-form-item label="标题">
            <el-input v-model="newPost.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="内容">
            <el-input v-model="newPost.content" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="标签">
            <el-select v-model="newPost.tag" placeholder="请选择标签">
                <el-option v-for="item in tags" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitPost">提交</el-button>
        </el-form-item>
    </el-form>

    <!-- 帖子列表 -->
    <div class="post-list">
        <div v-for="(post, index) in filteredPosts" :key="index" class="post-item">
            <h2>{{ post.title }}</h2>
            <p>{{ post.content }}</p>
            <p>{{ post.tag }}</p>
            <p>赞: {{ post.likes }}</p>
            <el-button type="primary" @click="likePost(index)">点赞</el-button>

            <!-- 评论列表 -->
            <div v-for="(comment, commentIndex) in post.comments" :key="'comment' + commentIndex">
                <p><strong>{{ comment.user }}</strong>: {{ comment.content }}</p>
                <el-button type="primary" @click="replyComment(index, commentIndex)">回复</el-button>
            </div>

            <!-- 评论框 -->
            <el-input v-model="post.newComment" placeholder="写评论..." @keyup.enter="addComment(index)"></el-input>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'ProjectForum',

  data () {
    return {
      searchText: '',
      newPost: {
        title: '',
        content: '',
        tag: ''
      },
      posts: [
        // 假数据
        {
          title: '标题1',
          content: '内容1',
          tag: '标签1',
          likes: 0,
          comments: [{
            user: '用户1',
            content: '评论内容1'
          },
          {
            user: '用户2',
            content: '评论内容2'
          }
            // 更多假评论...
          ],
          newComment: ''
        }
        // 更多假数据...
      ],
      tags: ['标签1', '标签2', '标签3'] // 标签列表
    }
  },

  computed: {
    filteredPosts () {
      if (!this.searchText) {
        return this.posts
      }
      return this.posts.filter(post => post.title.includes(this.searchText))
    }
  },

  methods: {
    submitPost () {
      this.posts.unshift({
        ...this.newPost,
        likes: 0,
        comments: [],
        newComment: ''
      })
      this.newPost = {
        title: '',
        content: '',
        tag: ''
      }
    },

    likePost (index) {
      this.posts[index].likes++
    },

    addComment (index) {
      this.posts[index].comments.push({
        user: '你',
        content: this.posts[index].newComment
      })
      this.posts[index].newComment = ''
    },

    replyComment (postIndex, commentIndex) {
      const comment = this.posts[postIndex].comments[commentIndex]
      this.posts[postIndex].newComment = `@${comment.user} `
    }
  }
}
</script>

<style lang="scss" scoped>
.project_forum {
    padding: 20px;

    .post-form {
        margin-bottom: 40px;
    }

    .post-list {
        .post-item {
            margin-bottom: 20px;
        }
    }
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.title h1 {
  text-align: center;
}
</style>
