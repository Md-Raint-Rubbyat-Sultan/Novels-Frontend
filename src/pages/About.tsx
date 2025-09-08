import { SkeletonCard } from "@/components/Layouts/Shared/skeletonCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPopularWritersQuery } from "@/redux/features/stats/stats.api";
import { useGetAdminsQuery } from "@/redux/features/user/user.api";
import type { IUser } from "@/types";

const About = () => {
  // RTK Query hooks
  const { data: adminsRes, isLoading: adminsLoading } =
    useGetAdminsQuery(undefined);
  const { data: writersRes, isLoading: writersLoading } =
    useGetPopularWritersQuery(undefined);

  const admins = adminsRes?.data || [];
  const writers = writersRes?.data || [];

  return (
    <div className="container mx-auto px-6 py-12 space-y-16">
      {/* Section 1 - About Me */}
      <section>
        <h2 className="text-3xl font-bold mb-6">About Me & The Platform</h2>
        <p className="text-muted-foreground leading-relaxed">
          I am a writer. It's more than a hobby; it's how I understand my
          feelings. I've always believed that to become a writer, you must first
          be a reader. But I realized that modern life moves so quickly that
          many people don't find the time to read books, short stories, or
          especially novels and poetry. So much time is spent on the internet,
          often without gaining anything meaningful.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          This inspired me to create a platform where anyone can read books
          online and expand their knowledge in a way that suits them. If you're
          someone who prefers digital to paper, you've come to the right place.
          <span className="font-semibold">
            {" "}
            Welcome—your next great read is waiting for you here.
          </span>
        </p>
      </section>

      {/* Section 2 - Our Team */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Our Team</h2>
        {adminsLoading ? (
          <SkeletonCard />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {admins.slice(0, 5).map((admin: IUser) => (
              <Card key={admin._id}>
                <CardHeader>
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={admin.picture} alt={admin.name} />
                    <AvatarFallback>{admin.name[0]}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="mt-2">{admin.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Role: {admin.role}</p>
                  <p className="text-muted-foreground">Email: {admin.email}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Section 3 - Honourable Writers */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Honourable Writers</h2>
        {writersLoading ? (
          <SkeletonCard />
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            {writers.map((writer: any) => (
              <Card key={writer.writerId}>
                <CardHeader>
                  <Avatar className="w-20 h-20 mx-auto">
                    <AvatarImage
                      src={writer.picture || undefined}
                      alt={writer.name}
                    />
                    <AvatarFallback>{writer.name?.[0] || "W"}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-center mt-4">
                    {writer.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    ⭐ Avg Rating: {writer.avgRating}
                  </p>
                  <p className="text-muted-foreground">
                    📖 Reviews: {writer.totalReviews}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default About;
