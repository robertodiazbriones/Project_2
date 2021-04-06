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


#this for loop packs each row into a dictionary and adds it to a list
for d in range(len(district)):
    #initialize the dictionary "entry"
    entry = {}
    
    #add all the things
    entry.update({'district': district[d]})
    entry.update({'index': int(d)})
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
#do a similar process for the school data

school_df = pd.read_csv('School_data.csv')  

#convert columns to numpy arrays for speed and ease of iteration
school = school_df['school'].to_numpy()
s_district = school_df['district'].to_numpy()
s_lat = school_df['lat'].to_numpy()
s_lng = school_df['lng'].to_numpy()
enrollment = school_df['enrollment'].to_numpy()
prcnt_wht = school_df['percent_white'].to_numpy()
prcnt_hisp = school_df['percent_hispanic'].to_numpy()
prcnt_bk = school_df['percent_black'].to_numpy()
prcnt_asn = school_df['percent_asian'].to_numpy()
prcnt_othr = school_df['percent_other'].to_numpy()
s_prcnt_stdnts_eligible_for_frl  = school_df['percent_student_body_eligible_for_frl'].to_numpy()
s_majority_minority = school_df['majority_minority'].to_numpy()

#variable for school data list

school_data = []

#same for loop logic as the last time

for s in range(len(school)):
    oed = {}
    oed.update({'school': school[s]})
    oed.update({'district' : s_district[s]})
    oed.update({'index': int(s)})
    oed.update({'lat': s_lat[s]})
    oed.update({'lng' : s_lng[s]})
    oed.update({'enrollment' : int(enrollment[s])})
    oed.update({'prcnt_wht' : int(prcnt_wht[s])})
    oed.update({'prcnt_hisp' : int(prcnt_hisp[s])})
    oed.update({'prcnt_bk' : int(prcnt_bk[s])})
    oed.update({'prcnt_asn' : int(prcnt_asn[s])})
    oed.update({'prcnt_othr' : int(prcnt_othr[s])})
    oed.update({'prcnt_stdnts_eligible_for_frl' : int(s_prcnt_stdnts_eligible_for_frl[s])})
    oed.update({'majority_minority' : s_majority_minority[s]})
    school_data.append(oed)

#dict for jsonify output
school_data_dict = {'school_data' : school_data}




app = Flask(__name__)

@app.route("/")
def home():
    return(render_template('index.html'))

@app.route("/api", methods=["GET"])
def api():
    response = jsonify(dist_data_dict)
    # Enable Access-Control-Allow-Origin
    response.headers.add("Access-Control-Allow-Origin", "*")

    return response

@app.route("/school_api", methods=["GET"])
def school_api():
    response1 = jsonify(school_data_dict)
    # Enable Access-Control-Allow-Origin
    response1.headers.add("Access-Control-Allow-Origin", "*")

    return response1

if __name__ == '__main__':
    app.run(debug = True)