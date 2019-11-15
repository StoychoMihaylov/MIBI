﻿// <auto-generated />
using System;
using MIBI.Data.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace MIBI.Data.Migrations
{
    [DbContext(typeof(MIBIContext))]
    [Migration("20191115203914_User and Tokens added")]
    partial class UserandTokensadded
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.3-servicing-35854")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("MIBI.Data.Entities.Group", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("MIBI.Data.Entities.NutrientAgarPlate", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("NutrientAgarPlates");
                });

            modelBuilder.Entity("MIBI.Data.Entities.Sample", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CreatedBy");

                    b.Property<DateTime>("CreatedOn");

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Samples");
                });

            modelBuilder.Entity("MIBI.Data.Entities.SampleGroup", b =>
                {
                    b.Property<Guid>("SampleId");

                    b.Property<Guid>("GroupId");

                    b.HasKey("SampleId", "GroupId");

                    b.HasIndex("GroupId");

                    b.ToTable("SampleGroups");
                });

            modelBuilder.Entity("MIBI.Data.Entities.SampleImage", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("SampleId");

                    b.Property<string>("Url");

                    b.HasKey("Id");

                    b.HasIndex("SampleId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("MIBI.Data.Entities.SampleNutrientAgarPlate", b =>
                {
                    b.Property<Guid>("SampleId");

                    b.Property<Guid>("NutrientAgarPlateId");

                    b.HasKey("SampleId", "NutrientAgarPlateId");

                    b.HasIndex("NutrientAgarPlateId");

                    b.ToTable("SampleNutrientAgarPlates");
                });

            modelBuilder.Entity("MIBI.Data.Entities.SampleTag", b =>
                {
                    b.Property<Guid>("SampleId");

                    b.Property<Guid>("TagId");

                    b.HasKey("SampleId", "TagId");

                    b.HasIndex("TagId");

                    b.ToTable("SampleTags");
                });

            modelBuilder.Entity("MIBI.Data.Entities.Tag", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Category");

                    b.Property<string>("Color");

                    b.Property<string>("IconUrl");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("MIBI.Data.Entities.TokenManager", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedOn");

                    b.Property<Guid?>("UserId");

                    b.Property<string>("Value")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Tokens");
                });

            modelBuilder.Entity("MIBI.Data.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(20);

                    b.Property<string>("PasswordHash")
                        .IsRequired();

                    b.Property<string>("Salt")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("MIBI.Data.Entities.SampleGroup", b =>
                {
                    b.HasOne("MIBI.Data.Entities.Group", "Group")
                        .WithMany("SampleGroups")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MIBI.Data.Entities.Sample", "Sample")
                        .WithMany("SampleGroups")
                        .HasForeignKey("SampleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MIBI.Data.Entities.SampleImage", b =>
                {
                    b.HasOne("MIBI.Data.Entities.Sample", "Sample")
                        .WithMany("Images")
                        .HasForeignKey("SampleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MIBI.Data.Entities.SampleNutrientAgarPlate", b =>
                {
                    b.HasOne("MIBI.Data.Entities.NutrientAgarPlate", "NutrientAgarPlate")
                        .WithMany("SampleNutrientAgarPlates")
                        .HasForeignKey("NutrientAgarPlateId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MIBI.Data.Entities.Sample", "Sample")
                        .WithMany("SampleNutrientAgarPlates")
                        .HasForeignKey("SampleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MIBI.Data.Entities.SampleTag", b =>
                {
                    b.HasOne("MIBI.Data.Entities.Sample", "Sample")
                        .WithMany("SampleTags")
                        .HasForeignKey("SampleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MIBI.Data.Entities.Tag", "Tag")
                        .WithMany("SampleTags")
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MIBI.Data.Entities.TokenManager", b =>
                {
                    b.HasOne("MIBI.Data.Entities.User", "User")
                        .WithMany("Tokens")
                        .HasForeignKey("UserId");
                });
#pragma warning restore 612, 618
        }
    }
}
