import { useEffect, useState } from 'react';
import { Client, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint(import.meta.env.PUBLIC_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.PUBLIC_APPWRITE_PROJECT)


const databases = new Databases(client);
const databaseId = import.meta.env.DATABASE_ID; 
const collectionId = import.meta.env.COLLECTION_ID;

const AdminBlogPage = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await databases.listDocuments(databaseId, collectionId);
      setPosts(response.documents.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)));
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div className="min-h-screen text-white font-extralight ">
      <main>

        {/* Blog Posts */}
        <section class="grid gap-6 max-w-4xl mx-auto">
          {posts.length > 0 ? (
            posts.map((post) => (
              <article key={post.$id} class="bg-gray-800 p-6 rounded shadow-lg">
                <h3 class="text-xl font-bold mb-2">{post.title}</h3>
                <p class="mb-4">{post.content}</p>
                <span class="text-sm">
                  Published on {new Date(post.$createdAt).toLocaleDateString()}
                </span>
              </article>
            ))
          ) : (
            <p class="text-center">No posts yet. Might add one later!</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminBlogPage;
