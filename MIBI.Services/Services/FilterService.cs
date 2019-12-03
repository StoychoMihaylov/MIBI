﻿namespace MIBI.Services.Services
{
    using System.Linq;
    using AutoMapper;
    using System.Collections.Generic;
    using Microsoft.EntityFrameworkCore;
    using MIBI.Data.Interfaces;
    using MIBI.Services.Interfaces;
    using MIBI.Models.ViewModels.AutocompleateSuggestions;

    public class FilterService : Service, IAutocompleteService
    {
        private readonly IMapper mapper;

        public FilterService(IMIBIContext context, IMapper mapper)
            : base(context)
        {
            this.mapper = mapper;
        }

        public List<GroupViewModel> GetAllGroups()
        {
            var groups = this.Context
                .Groups
                .AsNoTracking()
                .ToList();

            return this.mapper.Map<List<GroupViewModel>>(groups);
        }

        public List<AutocompleteBacteriaNamesViewModel> GetAllNamesOfSamples()
        {
            var samples = this.Context
                .Samples
                .AsNoTracking()
                .ToList();

            return this.mapper.Map<List<AutocompleteBacteriaNamesViewModel>>(samples);
        }

        public List<TagViewModel> GetAllTags()
        {
            var tags = this.Context
                .Tags
                .AsNoTracking()
                .ToList();

            return this.mapper.Map<List<TagViewModel>>(tags);
        }

        public List<NutrientAgarPlateViewModel> GetAllNutrientAgarPlates()
        {
            var nutrientAgarPlates = this.Context
                .NutrientAgarPlates
                .AsNoTracking()
                .ToList();

            return this.mapper.Map<List<NutrientAgarPlateViewModel>>(nutrientAgarPlates);
        }
    }
}
