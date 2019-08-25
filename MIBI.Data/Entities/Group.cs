﻿namespace MIBI.Data.Entities
{
    public class Group
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public virtual Sample Sample { get; set; }
    }
}