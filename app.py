#dependancies in
from flask import Flask, render_template, redirect, jsonify
import pandas as pd
import numpy as np

#read in .csv data
prune_df = pd.read_csv('district_data_full_clean.csv')

#use a for loop to package the data up

#break prune_df into single component numpy arrays
district = prune_df['NAME'].to_numpy()
lat = prune_df['lat'].to_numpy()
lng = prune_df['lng'].to_numpy()
tot_rev_per_s = prune_df['tot_rev_per_s'].to_numpy()
fed_rev_per_s = prune_df['fed_rev_per_s'].to_numpy()
st_rev_per_s = prune_df['st_rev_per_s'].to_numpy()
loc_rev_per_s = prune_df['loc_rev_per_s'].to_numpy()
district_enrollment = prune_df['ENROLL'].to_numpy()
tot_spend_per_s = prune_df['tot_spend_per_s'].to_numpy()
tot_inst_per_s = prune_df['tot_inst_per_s'].to_numpy()
ave_school_enrol = prune_df['ave_school_enrol'].to_numpy()
ave_prcnt_wht = prune_df['ave_prcnt_wht'].to_numpy()
ave_prcnt_hisp = prune_df['ave_prcnt_hisp'].to_numpy()
ave_prcnt_bk = prune_df['ave_prcnt_bk'].to_numpy()
ave_prcnt_asn = prune_df['ave_prcnt_asn'].to_numpy()
ave_prcnt_othr = prune_df['ave_prcnt_othr'].to_numpy()
prcnt_stdnts_eligible_for_frl  = prune_df['percent_student_body_eligible_for_frl'].to_numpy()
majority_minority = prune_df['majority_minority'].to_numpy()


#define an empty list for 
dist_data = []

for d in range(len(district)):
    #initialize the dictionary "entry"
    entry = {}
    
    #add all the things
    entry.update({'district': district[d]})
    entry.update({'lat': lat[d]})
    entry.update({'lng': lng[d]})
    entry.update({'tot_rev_per_s': tot_rev_per_s[d]})
    entry.update({'fed_rev_per_s': fed_rev_per_s[d]})
    entry.update({'st_rev_per_s': st_rev_per_s[d]})
    entry.update({'loc_rev_per_s': loc_rev_per_s[d]})
    entry.update({'district_enrollment': int(district_enrollment[d])})
    entry.update({'tot_spend_per_s': tot_spend_per_s[d]})
    entry.update({'tot_inst_per_s': tot_inst_per_s[d]})
    entry.update({'ave_school_enrol': ave_school_enrol[d]})
    entry.update({'ave_prcnt_wht': ave_prcnt_wht[d]})
    entry.update({'ave_prcnt_hisp':ave_prcnt_hisp[d]})
    entry.update({'ave_prcnt_bk': ave_prcnt_bk[d]})
    entry.update({'ave_prcnt_asn': ave_prcnt_asn[d]})
    entry.update({'ave_prcnt_othr': ave_prcnt_othr[d]})
    entry.update({'prcnt_stdnts_eligible_for_frl': prcnt_stdnts_eligible_for_frl[d]})
    entry.update({'majority_minority':majority_minority[d]})
    
    #append the entry into the dist_data list
    dist_data.append(entry)
    

dist_data_dict = {'district_data': dist_data}

app = Flask(__name__)

@app.route("/")
def home():
    return('Data at /api')

@app.route("/api", methods=["GET"])
def api():
    response = jsonify(dist_data_dict)
    # Enable Access-Control-Allow-Origin
    response.headers.add("Access-Control-Allow-Origin", "*")

    return response

if __name__ == '__main__':
    app.run(debug = True)