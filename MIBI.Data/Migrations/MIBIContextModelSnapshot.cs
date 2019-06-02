﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MIBI.Data.Migrations
{
    [DbContext(typeof(MIBIContext))]
    partial class MIBIContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.3-servicing-35854")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("MIBI.Data.Entities.Sample", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Samples");
                });

            modelBuilder.Entity("MIBI.Data.Entities.SampleImage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.Property<int?>("SampleId");

                    b.Property<string>("Url");

                    b.HasKey("Id");

                    b.HasIndex("SampleId");

                    b.ToTable("SampleImages");
                });

            modelBuilder.Entity("MIBI.Data.Entities.Tag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.Property<int?>("SampleId");

                    b.HasKey("Id");

                    b.HasIndex("SampleId");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("MIBI.Data.Entities.SampleImage", b =>
                {
                    b.HasOne("MIBI.Data.Entities.Sample", "Sample")
                        .WithMany("Images")
                        .HasForeignKey("SampleId");
                });

            modelBuilder.Entity("MIBI.Data.Entities.Tag", b =>
                {
                    b.HasOne("MIBI.Data.Entities.Sample", "Sample")
                        .WithMany("Tags")
                        .HasForeignKey("SampleId");
                });
#pragma warning restore 612, 618
        }
    }
}
